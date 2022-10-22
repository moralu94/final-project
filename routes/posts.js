const express = require('express')
const routerPosts = express.Router()

const { getPosts, showPost } = require('../controllers/posts')

// Rutas de INDEX
routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/:slug', showPost)

module.exports = {
    routerPosts
}