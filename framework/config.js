import 'dotenv/config'
const config = {
  baseUrl: process.env.TEST_BOOKSTORE_BASE_API_URL,
  userName: process.env.TEST_BOOKSTORE_USERNAME,
  password: process.env.TEST_BOOKSTORE_PASSWORD,
  userId: process.env.TEST_BOOKSTORE_USER_ID,
  isbn: process.env.TEST_BOOKSTORE_ISBN,
}

export default config
