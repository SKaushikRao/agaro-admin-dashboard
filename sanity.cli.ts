import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'i1zx9y9l',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
