const { response } = require ('express')
const passport = require('passport')

const Auth = require("../models/auth")

const showAuthFormSignUp = (req, res = response) => {
   res.render('auth/signup')
}

const signup = async (req, res = response) => {
   const errors = []
   const { userName, email, password, confirm_password } = req.body

   if (password.length < 5){
      errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres' })
   }
   
   if (password !== confirm_password){
      errors.push({ msg: 'Las contraseñas no coinciden' })
   }

   if(errors.length > 0) { 
      return res.render('auth/signup', {
         errors,
         userName,
         email
      })
   }

   const userFound = await Auth.findOne({ userName })
   if ( userFound ) {
      req.flash('error_user', 'Ya hay un usuario registrado con ese nombre de usuario')
      return res.redirect('/auth/signin')
   }

   const emailFound = await Auth.findOne({ email })
   if ( emailFound ) {
      req.flash('error_email', 'Ya hay un usuario registrado con ese correo')
      return res.redirect('/auth/signin')
   }

   const newUSer = new Auth ({userName, email, password})
   newUSer.password = await newUSer.passwordEncrypt(password)
   await newUSer.save()

   req.flash('todo_ok', 'Te has registrado correctamente')
   res.redirect('/auth/signin')
}

const showAuthFormSignIn = (req, res = response) => {
   res.render('auth/signin')
}

const signin = passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/auth/signin',
   failureFlash: true
})

const logout = async(req, res = response, next) => {
   await req.logout((err) => {
      if( err ) return next()
      res.redirect('/auth/signin')
      //logout msg
   })
}

module.exports = {
   showAuthFormSignUp,
   signup,
   showAuthFormSignIn,
   signin,
   logout, 
}