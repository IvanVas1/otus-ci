import { getTotal, nameIsValid, fullTrim } from '../src/app'

describe('Проверка имени пользователя', () => {
  it('Проверка короткого имени пользователя', () => {
    expect(nameIsValid('Te')).toBeFalsy()
  })

  it('Проверка корректного имени пользователя', () => {
    expect(nameIsValid('fox')).toBeTruthy()
  })

  it('Проверка на наличие cимволов в имени', () => {
    expect(nameIsValid('fox2')).toBeFalsy()
  })
})

describe('Проверка функции удаления пробелов из строки', () => {
  it('Проверка корректной работы - пробел в середине текста', () => {
    expect(fullTrim('Te xt')).toBe('Text')
  })

  it('Проверка пустой', () => {
    expect(fullTrim('')).toBe('')
  })

  it('Проверка корректной работы - пробел в начеле и конце текста', () => {
    expect(fullTrim(' Test ')).toBe('Test')
  })
})

describe('Проверка функции подсчета суммы заказа', () => {
  test.each([
    [10, 10, 0, 100],
    [10, 1, 0, 10],
    [10, 9, 0, 90],
    [10, 10, 10, 90],
    [10, 10, 99, 1],
    [10, 10, 100, 'error'],
    [10, 10, -1, 'error'],
    [10, 10, '1', 'error'],
  ])('%s %s %s = %s', (quantity, price, discount, expectation) => {
    if (expectation === 'error') {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => getTotal([{ quantity, price }], discount)).toThrow()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getTotal([{ quantity, price }], discount)).toBe(expectation)
    }
  })
})
