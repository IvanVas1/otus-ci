import { faker } from '@faker-js/faker'

const request = require('supertest')

describe('Create user Book Store API', () => {
  async function createUser(userName, password) {
    const response = await request('https://bookstore.demoqa.com')
      .post('/Account/v1/User')
      .set('Accept', 'application/json')
      .send({
        userName: userName,
        password: password,
      })
    return response
  }

  it('Создание нового пользователя', async () => {
    const response = await createUser(
      faker.internet.userName(),
      `${faker.internet.password()}*`,
    )

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('userID', expect.any(String))
    expect(response.body).toHaveProperty('username', expect.any(String))
    expect(response.body).toHaveProperty('books', expect.any(Array))
  })

  it('Создание нового пользователя - пользователь существует', async () => {
    const response = await createUser('vaiv', 'Qwerty*123')

    expect(response.status).toBe(406)
    expect(response.body).toHaveProperty('code', expect.any(String))
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('Создание нового пользователя - пароль не подходит', async () => {
    const response = await createUser('vaiv', '123')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('code', expect.any(String))
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('Получение токена на Book Store', () => {
  async function generateToken(userName, password) {
    const response = await request('https://bookstore.demoqa.com')
      .post('/Account/v1/GenerateToken')
      .set('Accept', 'application/json')
      .send({
        userName: userName,
        password: password,
      })
    return response
  }

  it('Получение токена', async () => {
    const response = await generateToken('vaiv1', 'Qwerty*124')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token', expect.any(String))
    expect(response.body).toHaveProperty('expires', expect.any(String))
    expect(response.body).toHaveProperty('status', expect.any(String))
    expect(response.body).toHaveProperty('result', expect.any(String))
  })

  it('Получение токена - неудачный запрос', async () => {
    const response = await generateToken('vaiv1', 'Qwerty124')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token', null)
    expect(response.body).toHaveProperty('expires', null)
    expect(response.body).toHaveProperty('status', expect.any(String))
    expect(response.body).toHaveProperty('result', expect.any(String))
  })
})

describe('Тестовые запросы', () => {
  it('Создание пользователя', async () => {
    const response = await request('https://reqres.in')
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        name: faker.person.firstName(),
        job: faker.person.jobType(),
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('name', expect.any(String))
    expect(response.body).toHaveProperty('job', expect.any(String))
    expect(response.body).toHaveProperty('id', expect.any(String))
    expect(response.body).toHaveProperty('createdAt', expect.any(String))
  })

  it('Обновлeние данных пользователя', async () => {
    const response = await request('https://reqres.in')
      .put('/api/users/2')
      .set('Accept', 'application/json')
      .send({
        name: faker.person.firstName(),
        job: faker.person.jobType(),
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name', expect.any(String))
    expect(response.body).toHaveProperty('job', expect.any(String))
    expect(response.body).toHaveProperty('updatedAt', expect.any(String))
  })

  it('Запрос конкретного пользователя', async () => {
    const response = await request('https://reqres.in')
      .get('/api/users/1')
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      data: {
        id: expect.any(Number),
        email: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        avatar: expect.any(String),
      },
      support: {
        url: expect.any(String),
        text: expect.any(String),
      },
    })
  })

  it('Запрос несуществующего пользователя', async () => {
    const response = await request('https://reqres.in')
      .get('/api/users/100000')
      .set('Accept', 'application/json')

    expect(response.status).toBe(404)
  })

  it('Удаление пользователя', async () => {
    const response = await request('https://reqres.in')
      .delete('/api/users/1')
      .set('Accept', 'application/json')

    expect(response.status).toBe(204)
  })
})
