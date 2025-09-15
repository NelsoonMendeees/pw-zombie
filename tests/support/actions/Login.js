import { expect } from '@playwright/test'

export class Login {
  constructor(page) {
    this.page = page
  }

  async do(payload) {
    await this.visit()
    await this.submitLogin(payload)
    await this.isLogged(payload)
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

  async isLogged(payload) {
    const loggedUser = this.page.locator('.logged-user')
    await expect(loggedUser).toHaveText(`Olá, ${payload.userName}`)
  }
}
