const routes = require('express').Router
const { User } = require('./app/models')

User.create({ name: 'Diego', email: 'diego@rocketseat.com.br', password_hash: '198234471293712983' })
module.exports = routes
