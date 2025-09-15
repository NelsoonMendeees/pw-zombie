import { expect } from '@playwright/test'

export class MoviesPage {
  constructor(page) {
    this.page = page
  }

  async create(payload) {
    await this.page.locator('a[href$="register"]').click()
    await expect(this.page.getByText('Cadastrar novo Filme')).toBeVisible()

    await this.page.getByLabel('Titulo do filme').fill(payload.title)
    await this.page.getByLabel('Sinopse').fill(payload.overview)
    await this.page
      .locator('#select_company_id .react-select__dropdown-indicator')
      .click()
      .then(() => this.page.locator(`.react-select__option:has-text("${payload.company}")`).click())

    await this.page
      .locator('#select_year .react-select__dropdown-indicator')
      .click()
      .then(() => this.page.locator(`.react-select__option:has-text("${payload.release_year}")`).click())

    await this.page.getByRole('button', { name: 'Cadastrar' }).click()
  }
}
