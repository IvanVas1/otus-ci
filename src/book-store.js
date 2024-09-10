import supertest from 'supertest'
import config from '../framework/config'

const generateToken = async (userName, password) => {
  const response = await supertest(config.baseUrl)
    .post('/Account/v1/GenerateToken')
    .send({
      userName,
      password,
    })
  return response
}

const createBook = async (token, userId, isbn) => {
  const response = await supertest(config.baseUrl)
    .post('/BookStore/v1/Books')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId: `${userId}`,
      collectionOfIsbns: [
        {
          isbn: `${isbn}`,
        },
      ],
    })
  return response
}

const getBook = async isbn => {
  const response = await supertest(config.baseUrl)
    .get('/BookStore/v1/Book')
    .query({ ISBN: `${isbn}` })
  return response
}

const updateBook = async (token, isbn1, userId, isbnUpdate) => {
  const response = await supertest(config.baseUrl)
    .put(`/BookStore/v1/Books/${isbn1}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId: `${userId}`,
      isbn: `${isbnUpdate}`,
    })
  return response
}

const deleteBook = async (token, isbn, userId) => {
  const response = await supertest(config.baseUrl)
    .delete('/BookStore/v1/Book')
    .set('Authorization', `Bearer ${token}`)
    .send({
      isbn: `${isbn}`,
      userId: `${userId}`,
    })
  return response
}

export { createBook, generateToken, getBook, updateBook, deleteBook }
