const Post = require('../models/posts') 

// mostrar todos los posts
const getPosts = async (req, res) => {
    
   try {
   
       const posts = await Post.find({}).lean()
       const title = "Listado de Post"

       res.render('index',
           {
               title,
               posts
           }
       )

   } catch (error) {
       console.log(error)
       /* res.status(400) ver desp*/
   }
}

// mostrar un post (show)
const showPost = async (req, res) => {
    
    try {

        const post = await Post.findOne({ slug : req.params.slug }).lean()
        if (post === null) return res.redirect('/')

        res.render('show', 
            {
                title: `Post ${post.title}`,
                post
            }
        )

    } catch (error) {//rev
        console.log(error);
    }
}

module.exports = {
   getPosts,
   showPost
}