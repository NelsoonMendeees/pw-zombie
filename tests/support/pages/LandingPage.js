import { expect } from '@playwright/test'

export class LandingPage {
  constructor(page) {
    this.page = page
  }
  async visit() {
    await this.page.goto('http://localhost:3000')
    await expect(this.page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!')
  }

  async openLeadModal() {
    await this.page.getByRole('button', { name: /Aperte o play/ }).click()
    await expect(this.page.locator('[data-testid="modal"]')).toContainText('Fila de espera')
  }

  async submitLeadForm(payload) {
    await this.page.locator('#name').fill(payload.name)
    await this.page.locator('#email').fill(payload.email)
    await this.page.locator('[data-testid="modal"]').getByText('Quero entrar na fila!').click()
  }
}
