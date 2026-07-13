import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, posix, relative, sep } from 'node:path';

const projectRoot = process.cwd();
const docsRoot = join(projectRoot, 'docs/pulse-ui-types');
const rawRoot = join(docsRoot, 'raw');
const generatedRoot = join(docsRoot, 'generated');

const rawParts = [
  { id: 'part-1', fileName: 'types-context.part-1.md' },
  { id: 'part-2', fileName: 'types-context.part-2.md' },
];

const normalizePath = (value) => value.split(sep).join('/');

const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const countLines = (value) => {
  if (value === '') {
    return 0;
  }

  const lines = value.split(/\r?\n/u).length;
  return value.endsWith('\n') ? lines - 1 : lines;
};

const uniqueSorted = (values) => [...new Set(values)].sort((left, right) =>
  left.localeCompare(right, 'en')
);

const extractExports = (source) => {
  const names = [];
  const declarationPattern =
    /export\s+(?:declare\s+)?(?:abstract\s+)?(?:type|interface|class|enum|const|function|namespace)\s+([A-Za-z_$][\w$]*)/gu;
  const listPattern = /export\s*\{([^}]+)\}/gu;

  for (const match of source.matchAll(declarationPattern)) {
    names.push(match[1]);
  }

  for (const match of source.matchAll(listPattern)) {
    for (const item of match[1].split(',')) {
      const normalized = item.trim().replace(/^type\s+/u, '').split(/\s+as\s+/u)[1] ??
        item.trim().replace(/^type\s+/u, '').split(/\s+as\s+/u)[0];

      if (/^[A-Za-z_$][\w$]*$/u.test(normalized)) {
        names.push(normalized);
      }
    }
  }

  if (/export\s+default\s+/u.test(source)) {
    names.push('default');
  }

  return uniqueSorted(names);
};

const extractImports = (source) =>
  uniqueSorted([...source.matchAll(/\bfrom\s+["']([^"']+)["']/gu)].map((match) => match[1]));

const getAreaAndEntity = (sourcePath) => {
  const segments = sourcePath.split('/');
  const area = segments[1] ?? 'other';
  const entity = area === 'components' || area === 'blocks' ? segments[2] ?? area : area;

  return { area, entity };
};

const parseRawPart = async ({ id, fileName }) => {
  const rawPath = join(rawRoot, fileName);
  const source = await readFile(rawPath, 'utf8');
  const generatedAt = source.match(/^Generated:\s*(.+)$/mu)?.[1] ?? null;
  const sectionPattern = /^### FILE: ([^\r\n]+)\r?\n```([^\r\n]*)\r?\n([\s\S]*?)\r?\n```(?=\r?\n|$)/gmu;
  const files = [];

  for (const match of source.matchAll(sectionPattern)) {
    const sourcePath = match[1].trim();

    if (!sourcePath.startsWith('src/') || sourcePath.includes('..')) {
      throw new Error(`Unsafe source path in ${fileName}: ${sourcePath}`);
    }

    const code = match[3];
    const { area, entity } = getAreaAndEntity(sourcePath);

    files.push({
      sourcePath,
      language: match[2].trim() || 'typescript',
      code,
      part: id,
      rawFile: fileName,
      area,
      entity,
      lineCount: countLines(code),
      exports: extractExports(code),
      imports: extractImports(code),
    });
  }

  return {
    id,
    fileName,
    generatedAt,
    sha256: sha256(source),
    lineCount: countLines(source),
    files,
  };
};

const addResolvedImports = (entries) => {
  const knownPaths = new Set(entries.map((entry) => entry.sourcePath));

  for (const entry of entries) {
    const resolvedImports = [];

    for (const importPath of entry.imports) {
      if (!importPath.startsWith('.')) {
        continue;
      }

      const basePath = posix.normalize(posix.join(posix.dirname(entry.sourcePath), importPath));
      const candidates = [
        basePath,
        `${basePath}.ts`,
        `${basePath}.tsx`,
        `${basePath}/types.ts`,
        `${basePath}/index.ts`,
      ];
      const resolvedPath = candidates.find((candidate) => knownPaths.has(candidate));

      if (resolvedPath !== undefined) {
        resolvedImports.push(resolvedPath);
      }
    }

    entry.resolvedImports = uniqueSorted(resolvedImports);
  }
};

const toMarkdownLink = (label, target) => `[${label}](<${normalizePath(target)}>)`;

const renderSourceDocument = (entry) => {
  const outputPath = join(generatedRoot, `${entry.sourcePath}.md`);
  const rawPath = join(rawRoot, entry.rawFile);
  const rawLink = relative(dirname(outputPath), rawPath);
  const exportsLine = entry.exports.length === 0 ? 'нет явных экспортов' : entry.exports.map((name) => `\`${name}\``).join(', ');
  const importsLine = entry.imports.length === 0 ? 'нет импортов' : entry.imports.map((name) => `\`${name}\``).join(', ');
  const dependenciesLine = entry.resolvedImports.length === 0
    ? 'нет разрешённых зависимостей внутри выгрузки'
    : entry.resolvedImports
      .map((sourcePath) => {
        const targetPath = join(generatedRoot, `${sourcePath}.md`);
        return toMarkdownLink(`\`${sourcePath}\``, relative(dirname(outputPath), targetPath));
      })
      .join(', ');

  return `<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# \`${entry.sourcePath}\`

- Источник: ${toMarkdownLink(entry.rawFile, rawLink)}
- Раздел: \`${entry.area}\`
- Компонент/группа: \`${entry.entity}\`
- Строк кода: ${entry.lineCount}
- Экспорты: ${exportsLine}
- Импорты: ${importsLine}
- Зависимости внутри выгрузки: ${dependenciesLine}

## Исходная типизация

\`\`\`${entry.language}
${entry.code}
\`\`\`
`;
};

const renderIndex = (entries, parts) => {
  const byArea = new Map();

  for (const entry of entries) {
    const byEntity = byArea.get(entry.area) ?? new Map();
    const entityFiles = byEntity.get(entry.entity) ?? [];
    entityFiles.push(entry);
    byEntity.set(entry.entity, entityFiles);
    byArea.set(entry.area, byEntity);
  }

  const sections = [...byArea.entries()]
    .sort(([left], [right]) => left.localeCompare(right, 'en'))
    .map(([area, byEntity]) => {
      const rows = [...byEntity.entries()]
        .sort(([left], [right]) => left.localeCompare(right, 'en'))
        .map(([entity, entityFiles]) => {
          const links = entityFiles
            .sort((left, right) => left.sourcePath.localeCompare(right.sourcePath, 'en'))
            .map((entry) => {
              const target = `generated/${entry.sourcePath}.md`;
              const shortPath = entry.sourcePath.replace(/^src\//u, '');
              return toMarkdownLink(`\`${shortPath}\``, target);
            })
            .join('<br>');
          const exports = uniqueSorted(entityFiles.flatMap((entry) => entry.exports));
          const exportPreview = exports.length === 0 ? '—' : exports.slice(0, 12).map((name) => `\`${name}\``).join(', ') + (exports.length > 12 ? ` … +${exports.length - 12}` : '');

          return `| \`${entity}\` | ${entityFiles.length} | ${links} | ${exportPreview} |`;
        })
        .join('\n');

      return `## \`${area}\`

| Компонент/группа | Файлов | Типизация | Экспорты (preview) |
| --- | ---: | --- | --- |
${rows}`;
    })
    .join('\n\n');

  const rawSummary = parts
    .map((part) => `- \`${part.fileName}\`: ${part.lineCount} строк, ${part.files.length} секций, SHA-256 \`${part.sha256}\``)
    .join('\n');

  return `<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# Индекс полной типизации Pulse UI

Всего исходных файлов: **${entries.length}**. Используйте этот индекс для перехода к одному компоненту, не загружая сырые части целиком.

${rawSummary}

Для поиска по имени экспортируемого типа используйте [EXPORTS.md](EXPORTS.md), для программного поиска — [manifest.json](manifest.json).

${sections}
`;
};

const renderExportsIndex = (entries) => {
  const byExport = new Map();

  for (const entry of entries) {
    for (const exportName of entry.exports) {
      const sources = byExport.get(exportName) ?? [];
      sources.push(entry);
      byExport.set(exportName, sources);
    }
  }

  const rows = [...byExport.entries()]
    .sort(([left], [right]) => left.localeCompare(right, 'en'))
    .map(([exportName, sources]) => {
      const links = sources
        .sort((left, right) => left.sourcePath.localeCompare(right.sourcePath, 'en'))
        .map((entry) => toMarkdownLink(`\`${entry.sourcePath}\``, `generated/${entry.sourcePath}.md`))
        .join('<br>');
      return `| \`${exportName}\` | ${links} |`;
    })
    .join('\n');

  return `<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# Индекс экспортов Pulse UI

Ищите здесь точное имя типа или интерфейса, затем открывайте только связанные исходные файлы.

| Экспорт | Исходные файлы |
| --- | --- |
${rows}
`;
};

const main = async () => {
  const parts = await Promise.all(rawParts.map(parseRawPart));
  const entries = parts.flatMap((part) => part.files);
  const uniquePaths = new Set(entries.map((entry) => entry.sourcePath));

  if (entries.length !== 264) {
    throw new Error(`Expected 264 type files, parsed ${entries.length}`);
  }

  if (uniquePaths.size !== entries.length) {
    throw new Error(`Duplicate source paths detected: ${entries.length - uniquePaths.size}`);
  }

  addResolvedImports(entries);

  await rm(generatedRoot, { recursive: true, force: true });
  await mkdir(generatedRoot, { recursive: true });

  await Promise.all(entries.map(async (entry) => {
    const outputPath = join(generatedRoot, `${entry.sourcePath}.md`);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderSourceDocument(entry), 'utf8');
  }));

  const manifest = {
    schemaVersion: 1,
    sourceGeneratedAt: uniqueSorted(parts.map((part) => part.generatedAt).filter(Boolean)),
    totalFiles: entries.length,
    totalRawLines: parts.reduce((total, part) => total + part.lineCount, 0),
    rawParts: parts.map(({ id, fileName, generatedAt, sha256: digest, lineCount, files }) => ({
      id,
      fileName,
      generatedAt,
      sha256: digest,
      lineCount,
      sectionCount: files.length,
    })),
    files: entries
      .sort((left, right) => left.sourcePath.localeCompare(right.sourcePath, 'en'))
      .map(({ code, ...entry }) => ({
        ...entry,
        document: `generated/${entry.sourcePath}.md`,
        sha256: sha256(code),
      })),
  };

  await Promise.all([
    writeFile(join(docsRoot, 'INDEX.md'), renderIndex(entries, parts), 'utf8'),
    writeFile(join(docsRoot, 'EXPORTS.md'), renderExportsIndex(entries), 'utf8'),
    writeFile(join(docsRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8'),
  ]);

  process.stdout.write(`Pulse UI types: generated ${entries.length} documents from ${parts.length} raw parts.\n`);
};

await main();
