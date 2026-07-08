import type { DepartmentDetails, DepartmentNode } from '../../api/directory/departments';

const createNode = (
  id: string,
  name: string,
  employeeCount: number,
  parentId: string | null,
  orgUnitNumber: string,
): DepartmentNode => ({
  id,
  name,
  employeeCount,
  parentId,
  orgUnitNumber,
});

const departmentNodes: DepartmentNode[] = [
  createNode('central-office', 'Центральный аппарат', 1842, null, '1000'),
  createNode('direct-subordination', 'Подразделения прямого подчинения', 624, null, '1100'),
  createNode('territorial-banks', 'Территориальные банки', 4318, null, '1200'),
  createNode('subsidiaries', 'Дочерние организации', 913, null, '1300'),
  createNode('representative-offices', 'Представительства', 147, null, '1400'),
  createNode('ecosystem', 'Экосистема', 1286, null, '1500'),
  createNode('dept-digital-platforms', 'Управление цифровых платформ', 148, 'central-office', '1001'),
  createNode('dept-operations-efficiency', 'Департамент операционной эффективности', 121, 'central-office', '1002'),
  createNode('dept-architecture', 'Центр архитектуры и интеграции', 132, 'central-office', '1003'),
  createNode('dept-process-transformation', 'Центр трансформации процессов', 109, 'central-office', '1004'),
  createNode('dept-data-lab', 'Лаборатория аналитики данных', 94, 'central-office', '1005'),
  createNode('dept-client-service', 'Управление клиентского сервиса', 176, 'central-office', '1006'),
  createNode('dept-infrastructure', 'Инженерный блок инфраструктуры', 167, 'central-office', '1007'),
  createNode('dept-compliance-control', 'Департамент комплаенс-контроля', 88, 'direct-subordination', '1101'),
  createNode('dept-client-solutions', 'Блок клиентских решений', 142, 'direct-subordination', '1102'),
  createNode('dept-sales-support', 'Служба развития продаж', 203, 'territorial-banks', '1201'),
  createNode('dept-service-support', 'Центр сервисной поддержки', 176, 'territorial-banks', '1202'),
  createNode('dept-operations', 'Служба внутренних операций', 214, 'territorial-banks', '1203'),
  createNode('subsidiary-tech', 'Технологические активы', 371, 'subsidiaries', '1301'),
  createNode('subsidiary-service', 'Сервисные активы', 284, 'subsidiaries', '1302'),
  createNode('rep-cis', 'Представительства СНГ', 84, 'representative-offices', '1401'),
  createNode('rep-asia', 'Представительства Азия', 63, 'representative-offices', '1402'),
  createNode('eco-fintech', 'Финтех-платформы', 512, 'ecosystem', '1501'),
  createNode('eco-services', 'Сервисы экосистемы', 441, 'ecosystem', '1502'),
];

const nodesById = new Map<string, DepartmentNode>(departmentNodes.map((node) => [node.id, node]));

const buildPath = (departmentId: string): DepartmentDetails['path'] => {
  const path: DepartmentDetails['path'] = [];
  let currentNode = nodesById.get(departmentId);

  while (currentNode !== undefined) {
    path.unshift({
      id: currentNode.id,
      name: currentNode.name,
    });

    currentNode =
      currentNode.parentId === null ? undefined : nodesById.get(currentNode.parentId);
  }

  return path;
};

export const departmentDetailsFixture: Record<string, DepartmentDetails> = Object.fromEntries(
  departmentNodes.map((node) => [
    node.id,
    {
      ...node,
      path: buildPath(node.id),
    },
  ]),
);

export const getDepartmentChildrenFixture = (departmentId: string): DepartmentNode[] =>
  departmentNodes.filter((node) => node.parentId === departmentId);
