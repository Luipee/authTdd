const bcrypt = require('bcrypt.js')
const { it } = require('node:test')

const { User } = require('../../src/app/models')

const truncate = require('../unit/truncate')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await User.create({ name: 'Diego ', email: 'diego@rocketseat.com.br', password: '123456' })

    const hash = await bcrypt.hash('123456', 8)

    const compareHash = await bcrypt.compare('123456', user.password_hash)

    expect(await bcrypt.compare(compareHash)).toBe(hash)
  })
})
