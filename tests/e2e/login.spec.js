import { test } from '../support'

const payload = {
  email: 'admin@zombieplus.com',
  password: 'pwd123'
}

test('deve logar como administrador', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin(payload)
  await page.login.isLogged()
})

test('não deve logar quando o email é inválido', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin({ ...payload, email: 'admin.zombieplus.com' })
  await page.components.alertHaveText('Email incorreto')
})

test('não deve logar com senha incorreta', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin({ ...payload, password: 'pwd12345' })
  const text = 'Por favor, verifique suas credenciais e tente novamente.'
  await page.components.toastHaveText(text)
})

test('não deve logar quando o email não é informado', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin({ ...payload, email: '' })
  await page.components.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é informada', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin({ ...payload, password: '' })
  await page.components.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin({ ...payload, email: '', password: '' })
  await page.components.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
