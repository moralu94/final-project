# Proyecto Final - Node.JS Digitalers

## [Live Preview](https://final-project-8lrl.onrender.com/)
----------------------
## ¿En que consiste este proyecto?
Este proyecto es el proyecto final del curso Node.JS [Digitalers de Telecom](https://www.digitalers.com.ar/index.html#sobre-digitalers). 

Consiste en crear una aplicación backend con Node.JS, en este caso creamos un blog.

El blog fue armado con [Bulma](https://bulma.io/) en el frontend. Bulma es un framework Mobile First, a pesar de esto, la aplicación no se ve bien en dispositivos móviles por mi falta práctica con el front.

Este blog requiere que crees una cuenta, no es necesario que introduzcas un email válido o una contraseña súper segura, la misma se hashea con 'bcrypt'. 

Una vez creada la cuenta puedes iniciar sesión y crear ó ver posts. Cuando crees un post podrás incluir o no una imagen. Los posteos se guardan en una base Mongo, junto con los usuarios y las sesiones.

Sí creaste un post luego podrás eliminar o editar el post que te pertenece.
También podes ver los posts de otros usuarios (haciendo click en su título ó en su imagen si posee una) ó los posts de un usuario específico (haciendo click en su nombre de usuario).



-----------------------

## Librerias/Libraries

>[Express](https://www.npmjs.com/package/express)

>[Nodemon](https://www.npmjs.com/package/nodemon)

>[Express-handlebars](https://www.npmjs.com/package/express-handlebars)

>[Express-session](https://www.npmjs.com/package/express-session)

>[@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)

>[bcrypt](https://www.npmjs.com/package/bcrypt)

>[Connect-flash](https://www.npmjs.com/package/connect-flash)

>[Connect-mongo](https://www.npmjs.com/package/connect-mongo)

>[dotenv](https://www.npmjs.com/package/dotenv)

>[fs-extra](https://www.npmjs.com/package/fs-extra)

>[luxon](https://www.npmjs.com/package/luxon)

>[Mongoose](https://www.npmjs.com/package/mongoose)

>[Multer](https://www.npmjs.com/package/multer)

>[method-override](https://www.npmjs.com/package/method-override)

>[Passport](https://www.npmjs.com/package/passport)

>[Passport-local](https://www.npmjs.com/package/passport-local)

>[Slugify](https://www.npmjs.com/package/slugify)
