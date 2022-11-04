const express = require('express')
const { showAuthFormSignUp, signup, showAuthFormSignIn, signin, logout, profile } = require('../controllers/auth')
const forward = require('../middlewares/forward')
const isAuthenticated = require('../middlewares/isauthenticated')

const routerAuth = express.Router()

// Rutas

routerAuth.get("/auth/signup", forward, showAuthFormSignUp)
routerAuth.post("/auth/signup", signup)

routerAuth.get('/auth/signin', forward, showAuthFormSignIn)
routerAuth.post('/auth/signin', signin)

routerAuth.get('/auth/logout', logout)

module.exports = {
   routerAuth
}