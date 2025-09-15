import { expect } from '@playwright/test'

export class Components {
  constructor(page) {
    this.page = page
  }

  async toastHaveText(text) {
    const toast = this.page.locator('.toast')
    await expect(toast).toContainText(text)
    await expect(toast).not.toBeVisible({ timeout: 8000 })
  }

  async alertHaveText(text) {
    const alert = this.page.locator('span[class$=alert]')
    await expect(alert).toHaveText(text)
  }
}
