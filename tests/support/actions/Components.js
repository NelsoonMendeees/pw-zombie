import { expect } from '@playwright/test'

export class Components {
  constructor(page) {
    this.page = page
  }

  async popUpContainText(text) {
    const element = this.page.locator('.swal2-html-container')

    await expect(element).toContainText(text, { timeout: 6000 })
  }

  async alertHaveText(text) {
    const alert = this.page.locator('span[class$=alert]')
    await expect(alert).toHaveText(text)
  }
}
