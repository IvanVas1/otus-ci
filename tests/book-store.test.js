import {
  createBook,
  generateToken,
  getBook,
  updateBook,
  deleteBook,
} from '../src/book-store'

let token
const isbn = '9781449331818'

describe('Authorized', () => {
  beforeAll(async () => {
    const response = await generateToken('vaiv', 'Qwertyu*123')
    token = response.body.token
  })

  it('Create Book', async () => {
    const response = await createBook(
      token,
      '14abd043-bb19-43da-9a80-cfd375b9d0f7',
      isbn,
    )
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('books', expect.any(Array))
  })

  it('Get Book information', async () => {
    const response = await getBook(isbn)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      isbn,
      title: expect.any(String),
      subTitle: expect.any(String),
      author: expect.any(String),
      publish_date: expect.any(String),
      publisher: expect.any(String),
      pages: expect.any(Number),
      description: expect.any(String),
    })
  })

  it('Update Book', async () => {
    const response = await updateBook(
      token,
      isbn,
      '14abd043-bb19-43da-9a80-cfd375b9d0f7',
      '9781491950296',
    )

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty(
      'userId',
      '14abd043-bb19-43da-9a80-cfd375b9d0f7',
    )
    expect(response.body).toHaveProperty('username', 'vaiv')
    expect(response.body.books.length).toBeGreaterThan(0)
  })

  it('Delete Book', async () => {
    const response = await deleteBook(
      token,
      '9781491950296',
      '14abd043-bb19-43da-9a80-cfd375b9d0f7',
    )

    expect(response.status).toBe(204)
  })
})
