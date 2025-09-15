import { test } from '../support'
import { executeQuery } from '../support/db'
import data from '../support/fixtures/movies.json'
import payload from '../support/fixtures/admin.json'

test.beforeAll(async () => {
  await executeQuery(`DELETE FROM movies`)
})

test('deve cadastrar um filme', async ({ page }) => {
  const { create } = data
  // await executeQuery(`DELETE FROM movies WHERE title = '${create.title}'`)

  await page.login.do(payload)

  await page.movies.create(create)
  await page.components.toastHaveText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({ page }) => {
  const validate = [
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ]

  await page.login.do(payload)

  await page.movies.goForm()
  await page.movies.submitMovie()
  await page.components.alertHaveText(validate)
})

test('não deve cadastrar um filme que já existe', async ({ page, request }) => {
  const { duplicate } = data

  await request.api.postMovieCover(duplicate)

  await page.login.do(payload)
  await page.movies.create(duplicate)
  await page.components.toastHaveText('Este conteúdo já encontra-se cadastrado no catálogo')
})
