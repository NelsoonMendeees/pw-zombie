import { expect } from '@playwright/test'

export class LoginPage {
  constructor(page) {
    this.page = page
  }

  async visit() {
    await this.page.goto('http://localhost:3000/admin/login')

    const loginForm = this.page.locator('.login-form')
    await expect(loginForm).toBeVisible()
  }

  async submitLogin(payload) {
    await this.page.getByPlaceholder('E-mail').fill(payload.email)
    await this.page.getByPlaceholder('Senha').fill(payload.password)
    await this.page.getByRole('button', { name: 'Entrar' }).click()
  }

  async isLogged() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.page).toHaveURL(/.*admin/)
  }
}
