// Estrategia

const passport = require('passport')
const { Strategy } = require('passport-local')
const auth = require('../models/auth')

passport.use(
   new Strategy( 
      {
         usernameField: 'email',
      },
      async (email, password, done) => {

         const user = await auth.findOne({ email })

         if(!user){
            return done(null, false, {message: 'User not found.'})
         }

         const isMatch = await user.checkPassword(password)
         if( !isMatch ) {
            return done(null, false, {message:'Password Error'})
         }

         return done(null, user)

      }
   )
)

passport.serializeUser((user, done) => {
   done(null, user.id)
})

passport.deserializeUser((id, done) => {
   auth.findById(id, (err, user) => {
      done(err, user)
   })
})