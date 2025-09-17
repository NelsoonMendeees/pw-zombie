import { test, expect } from '../support'
import { fakerPT_BR as faker } from '@faker-js/faker'

const payload = {
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase()
}

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(payload)
  await page.components.popUpContainText('Agradecemos por compartilhar seus dados conosco.')
})

test('não deve cadastrar um lead quando o email já existe', async ({ page, request }) => {
  const newLead = await request.post('http://localhost:3333/leads', {
    data: { name: payload.name, email: payload.email }
  })
  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(payload)
  await page.components.popUpContainText('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera.')
})

test('não deve cadastrar um lead com email inválido', async ({ page }) => {
  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm({ ...payload, email: 'nelson.qa.com' })
  await page.components.alertHaveText('Email incorreto')
})

test('não deve cadastrar um lead quando o nome não é informado', async ({ page }) => {
  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm({ ...payload, name: '' })
  await page.components.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar um lead quando o email não é informado', async ({ page }) => {
  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm({ ...payload, email: '' })
  await page.components.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar um lead quando nenhum campo é informado', async ({ page }) => {
  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm({ ...payload, name: '', email: '' })
  await page.components.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
