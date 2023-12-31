import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig } from '@playwright/test';

const PORT = process.env['PORT'] || 4200;
const baseURL = process.env['BASE_URL'] || `http://localhost:${PORT}`;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

const nxPreset = nxE2EPreset(__filename, { testDir: './src' });

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
  ...nxPreset,
  projects: [
    { name: 'setup', testMatch: 'src/api/setup/user.spec.ts' },
    { ...nxPreset.projects?.[0], dependencies: ['setup'] },
  ],

  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm exec nx serve angular',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
});
