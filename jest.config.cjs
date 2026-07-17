/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/apps/AddressBook/**/*.{ts,tsx}',
    'src/Components/Adressbook/**/*.{ts,tsx}',
    '!**/*.styles.ts',
    '!**/styled.ts',
    '!**/styles.ts',
    '!**/index.ts',
    '!**/types.ts',
    '!**/constants.tsx',
    '!**/theme.ts',
    '!**/mocks/fixtures/**',
    '!**/test-utils/**',
    '!**/pages/StuctureDepartmentPage/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleNameMapper: {
    '^@pulse/ui/components/(.*)$': '<rootDir>/src/stubs/pulse/ui/$1',
    '^@pulse/ui/theme$': '<rootDir>/src/host/pulseTheme.ts',
    '^@pulse/(.*)$': '<rootDir>/src/stubs/pulse/$1',
    '^@hrplatform/utils$': '<rootDir>/src/host/hrplatformUtils.ts',
    '^@sber-hrp-core/api-breadcrumbs$': '<rootDir>/src/host/breadcrumbs.ts',
    '^i18next$': '<rootDir>/src/host/i18next.ts',
    '^react-i18next$': '<rootDir>/src/host/reactI18next.ts',
    '\\.(svg)$': '<rootDir>/src/host/svgComponentStub.tsx',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          module: 'CommonJS',
          target: 'ES2021',
          esModuleInterop: true,
        },
      },
    ],
  },
};
