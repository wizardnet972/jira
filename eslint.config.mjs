import nx from '@nx/eslint-plugin';
export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: false,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'domain:shell',
              onlyDependOnLibsWithTags: ['domain:shell', 'domain:shared'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:api',
                'type:feature',
                'type:ui',
                'type:domain-logic',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:domain-logic',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:domain-logic',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:domain-logic', 'type:util'],
            },
            {
              sourceTag: 'type:domain-logic',
              onlyDependOnLibsWithTags: ['type:domain-logic', 'type:util'],
            },
            { sourceTag: 'type:util', onlyDependOnLibsWithTags: ['type:util'] },
            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: ['domain:shared'],
            },
            {
              sourceTag: 'domain:project',
              onlyDependOnLibsWithTags: ['domain:project', 'domain:shared'],
            },
            {
              sourceTag: 'domain:issue',
              onlyDependOnLibsWithTags: ['domain:issue', 'domain:shared'],
            },
            {
              sourceTag: 'domain:board',
              onlyDependOnLibsWithTags: ['domain:board', 'domain:shared'],
            },
            {
              sourceTag: 'domain:sprint',
              onlyDependOnLibsWithTags: ['domain:sprint', 'domain:shared'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
