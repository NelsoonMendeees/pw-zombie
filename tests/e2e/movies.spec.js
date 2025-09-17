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
  await page.components.popUpContainText(`O filme '${create.title}' foi adicionado ao catálogo.`)
})

test('deve remover um filme', async ({ page, request }) => {
  const { remove } = data

  await request.api.postMovieCover(remove)

  await page.login.do(payload)
  await page.movies.remove(remove)
  await page.components.popUpContainText('Filme removido com sucesso.')
})

test('não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({ page }) => {
  const validate = ['Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório']

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
  await page.components.popUpContainText(`O título '${duplicate.title}' já consta em nosso catálogo.`)
})

test('deve buscar um filme', async ({ page, request }) => {
  const { search } = data

  search.data.forEach(async (m) => {
    await request.api.postMovieCover(m)
  })

  await page.login.do(payload)
  await page.movies.search(search.input)
  await page.movies.tableHave(search.outputs)
})
