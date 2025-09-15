import { test } from '../support'
import { executeQuery } from '../support/db'
import data from '../support/fixtures/movies.json'

const payload = {
  email: 'admin@zombieplus.com',
  password: 'pwd123'
}

test('deve cadastrar um filme', async ({ page }) => {
  const { create } = data
  await executeQuery(`DELETE FROM movies WHERE title = '${create.title}'`)

  await page.login.visit()
  await page.login.submitLogin(payload)
  await page.login.isLogged()

  await page.movies.create(create)
  await page.components.toastHaveText('Cadastro realizado com sucesso!')
})
