const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AuthSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         require: true,
         unique: true
      },
      email: {
         type: String,
         require: true,
         unique:true
      },
      password: {
         type: String,
         require: true
      }
   },
   {
      timestamps: true,
      versionKey: false,
   }
)

AuthSchema.methods.passwordEncrypt = async(password) => {
   const salt = await bcrypt.genSalt(10)
   return await bcrypt.hash(password, salt)
}

AuthSchema.methods.checkPassword = async function( password ) {
   return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Auth', AuthSchema)