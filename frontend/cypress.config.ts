import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'vqrqjc',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
