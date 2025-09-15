import { test as base, expect } from '@playwright/test'

import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { MoviesPage } from './pages/MoviesPage'
import { Components } from './pages/Components'

const test = base.extend({
  page: async ({ page }, use) => {
    await use({
      ...page,
      landing: new LandingPage(page),
      login: new LoginPage(page),
      movies: new MoviesPage(page),
      components: new Components(page)
    })
  }
})

export { test, expect }
