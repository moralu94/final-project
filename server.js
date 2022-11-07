const express = require('express')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')
const passport = require('passport')

const path = require('path');

require('dotenv').config()
require('./config/passport')

const { dbConnection } = require('./database/config')
const { routerAuth } = require('./routes/auth')
const { routerDev } = require('./routes/db')
const { routerPosts } = require('./routes/posts')

// Inicializo la aplicación de express
const app = express()

// Conectar a la DB
dbConnection()

// Template Engine
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: process.env.DB_REMOTA_URI})
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Middleware para mostrar mensajes
app.use((req, res, next) => {
    res.locals.todo_ok = req.flash('todo_ok')
    res.locals.error_user = req.flash('error_user')
    res.locals.error_email = req.flash('error_email')
    res.locals.create_post = req.flash('create_post')
    res.locals.delete_post = req.flash('delete_post')
    res.locals.edit_post = req.flash('edit_post');
    res.locals.wrong_title_error = req.flash('wrong_title_error')
    
    res.locals.user = req.user || null
    next()
})

// Routes
app.use('/', routerAuth)
app.use('/', routerDev) // Solo para desarrollo
app.use('/', routerPosts)

// static files
app.use(express.static(path.join(__dirname, 'public/uploads/')));

const PORT = process.env.PORT
app.listen(PORT, err => {
    if ( err ) throw new Error('Ocurrió un problema con el servidor: ', err)
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})