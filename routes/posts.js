const express = require('express')
const routerPosts = express.Router()

const { getMain, getHome, getPosts, view_newPost, createPost, showPost, deletePost, view_editPost, editPost, getPostsUser, searchPost} = require('../controllers/posts')
const upload = require('../config/multer')
const isAuthenticated = require('../middlewares/isauthenticated')

// Rutas de INDEX
routerPosts.get('/', getMain)
routerPosts.get('/home', isAuthenticated, getHome)
routerPosts.get('/posts', isAuthenticated, getPosts)
routerPosts.get('/posts/search', isAuthenticated, searchPost)
routerPosts.get('/posts/user/:userName', isAuthenticated, getPostsUser)
routerPosts.get('/posts/new', isAuthenticated, view_newPost)
routerPosts.get('/posts/edit/:id', isAuthenticated, view_editPost)
routerPosts.get('/posts/:slug', isAuthenticated, showPost)

routerPosts.post('/posts', upload.single('image'), isAuthenticated, createPost)

routerPosts.put('/posts/:id', isAuthenticated, editPost)

routerPosts.delete('/posts/:id', isAuthenticated, deletePost)

module.exports = {
    routerPosts
}