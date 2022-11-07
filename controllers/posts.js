const { DateTime } = require("luxon");
const { response } = require('express')
const Post = require('../models/posts')

const path = require('path'); 
const { unlink } = require('fs-extra');

const getMain = (req, res = response) => {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.status(200).render('main', {title: 'Info-Blog'})
}

const getHome = (req, res = response) => {
    res.status(200).render('home', {title: 'Info-Blog', name : req.user.userName})
}

// VISTA - mostrar todos los posts - Index
const getPosts = async (req, res) => {
    
   try {
   
       const posts = await Post.find({}).sort({_id: -1}).lean()
       const title = "Todos los Posts"

       res.render('posts/index',
            {
               name: req.user.userName,
               title,
               posts,
            }
       )

   } catch (error) {
       console.log(error)
       res.json({msg: error})
   }
}

// VISTA - mostrar todos los posts de un usuario especifico
const getPostsUser = async (req, res) => {

    try {
    
        const posts = await Post.find({author: req.params.userName}).sort({_id: -1}).lean()
        const author = req.params.userName
 
        res.render('posts/show-user',
            {
                name: req.user.userName,
                title: `Posts de ${author}`,
                name_poster: author,
                posts
            }
        )
 
    } catch (error) {
        console.log(error)
        res.json({msg: error})
    }
}

// VISTA - mostrar un post (show) - Show
const showPost = async (req, res) => {
    let hasAccess = false
    try {

        const post = await Post.findOne({ slug : req.params.slug }).lean()
        if (post === null) return res.redirect('/')

        const user = req.user.userName
        if (post.author == user) hasAccess = true
        /* console.log(post.path, post.hasImg) */
        
        res.render('posts/show', 
            {
                name: req.user.userName,
                title: `Post ${post.title}`,
                hasAccess,
                post,
            }
        )

    } catch (error) {//r
        console.log(error);
        res.json({msg: error})
    }
}

const editPost = async (req, res) => {
    const {id} = req.params
    const {title, body} = req.body

    try {
        const editPost = await Post.updateOne({_id: id}, {$set: {title, body}})
        const post = await Post.findById({_id : id}).lean()
        
        req.flash('edit_post', 'El Post se modificó con éxito!');
        res.status(200).redirect(`/posts/${post.slug}`)
    } catch (error) {
        console.log(error); //
        res.json({msg: error})
    } 
}

// borrar un post - Delete
const deletePost = async(req, res = response) => {
    
    try {

        const deletePost = await Post.findByIdAndDelete(req.params.id)
        if (deletePost.hasImg) {
            await unlink(path.resolve('./public' + deletePost.path))
        }
        
        req.flash('delete_post', 'Se ha borrado el post con éxito!')
        res.redirect('/posts')

    } catch (error) {
        console.log(error); //
        res.json({msg: error})
    }

}

// VISTA - nuevo post - New
const view_newPost = (req, res = response) => {
    res.status(200).render('posts/new', 
    {
        title: 'Nuevo Post', 
        name: req.user.userName
    })
}

// crear post - Create
const createPost = async (req, res = response) => {

    try {
        let post = new Post()

        if (req.file){
            post.img = req.file.filename
            post.path = '/uploads/' + req.file.filename
            post.hasImg = true
            post.title = req.body.title
            post.body = req.body.body
            post.date = DateTime.now().setLocale('es').toFormat('DDD')
            post.author = req.user.userName
        }
        else {
            post.hasImg = false
            post.title = req.body.title
            post.body = req.body.body
            post.date = DateTime.now().setLocale('es').toFormat('DDD')
            post.author = req.user.userName
        }

        post = await post.save()

        //notificacion
        req.flash('create_post', 'Se ha creado el post con exito!')
        res.status(200).redirect(`/posts/${post.slug}`)

    } catch (error) {
        /* console.log(error);  */
        /* res.json({msg: error}) */
        if ((error.message == "Post validation failed: slug: Path `slug` is required.") || (error.code == '11000')){
            req.flash('wrong_title_error', 'Hubo un error generando este post, intentalo de nuevo');
            //los slugs son unicos..
        }
        return res.redirect('posts/new')
    } 

}

// edit post 
const view_editPost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id).lean()

        res.status(200).render('posts/edit', {
            name: req.user.userName,
            title: 'Editando Post',
            post
        })
        
    } catch (error) {
        console.log(error); //
        res.json({msg: error})
    }
    
}

//busqueda de posts
const searchPost = async (req, res = response) => {
    searchQuery = req.query.searchInput

    try {

        const posts = await Post.find({title: {$regex: searchQuery, $options: "i"}}).sort({_id: -1}).lean()

        res.status(200).render('posts/search',
        {
            name: req.user.userName,
            title: `Búsqueda: '${searchQuery}'`,
            searchQuery,
            posts
        })

    } catch (error) {
        console.log(error); //
        res.json({msg: error})
    } 
}

module.exports = {
    getMain,
    getHome,
    getPosts,
    getPostsUser,
    showPost,
    deletePost,
    createPost,
    view_newPost,
    view_editPost,
    editPost, 
    searchPost
}
