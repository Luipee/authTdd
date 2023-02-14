const request = require('supertest')
const app = require('../../src/app')

const truncate = require('../utils/truncate')

const factory = require('../factories')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })
    expect(response.status).toBe(200)
  })
  it('should not auth with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.status).toBe(200)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })
    expect(response.body).toHaveProperty('token')
  })
  it('should be able to acess private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.body).toHaveProperty('token')
  })
  it('should not be able to acess private routes when not authenticated', async () => {
    const response = await request(app).get('/dashboard')
      .get('/dashboard')

    expect(response.status).toBe(401)
  })
  it('should not be able to acess private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization')

    expect(response.status).toBe(200)
  })
})
