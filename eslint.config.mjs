// @ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'dist',
      'build',
      'coverage',
      // Código gerado pelo Prisma — não lintar nem formatar
      'src/generated',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  // SEMPRE por último: desliga toda regra de estilo do ESLint que poderia
  // discordar do Prettier (indentação, quotes, semi, largura de linha...).
  //
  // Nota: NÃO usamos `eslint-plugin-prettier` de propósito. Rodar o Prettier
  // dentro do ESLint faz o mesmo problema aparecer duas vezes (como erro de
  // lint e como diff de formatação) e é a causa da briga entre os dois.
  // A formatação vive só no .prettierrc / .editorconfig e é aplicada pelo
  // Prettier (no save do editor ou via `pnpm format`).
  eslintConfigPrettier,
);
