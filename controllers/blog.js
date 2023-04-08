const blogRouter = require('express').Router()
const util = require('../utils/config')
const jwt = require('jsonwebtoken')
const extractorUser = require('../middlewares/extractorUser')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.status(200).json(blogs)
})

blogRouter.post('/', extractorUser, async (request, response) => {

  const body = request.body
  
  // Gracias al middleware "extractorToken", el token viene PARSEADO en la request
  // const token = request.token
  // console.log('Token desde Blog controller: ', token)
  
  
  // if(!token)
  //   return response.status(401).json({error:"No autorizado"})
  
  // let decodedToken
  // try {
  //   decodedToken = jwt.verify(token, util.SECRET_FOR_JWT)
  //   console.log(decodedToken)
  // }catch (error) {
  //   return response.status(401).json({error:"Sesion expirada"})
  // }
  
  // if(!(decodedToken && decodedToken.username && decodedToken.id))
  //   return response.status(401).json({error: "No autorizado"})
  
  // const user = await User.findOne({username: decodedToken.username})

  const user = request.user
  
  const blog = new Blog({
    title: body.title,
    author: user.username,
    url: body.url,
    likes: body.likes,
    user: user.id
  })  

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog)
})

blogRouter.delete('/:id', extractorUser, async (request, response) => {
  const id = request.params.id
  console.log('1', id)
  
  ///////////////////// Logica del TOKEN /////////////////////////////////
  // Gracias al middleware "extractorToken", el token viene PARSEADO en la request
  // const token = request.token
  
  // if(!token)
  //   return response.status(401).json({error:"No autorizado"})
  
  // let decodedToken
  // try {
  //   decodedToken = jwt.verify(token, util.SECRET_FOR_JWT)
  //   console.log(decodedToken)
  // }catch (error) {
  //   return response.status(401).json({error:"Sesion expirada"})
  // }
  
  // if(!(decodedToken && decodedToken.username))
  //   return response.status(401).json({error: "No autorizado"})
  // const user = await User.findOne({username: decodedToken.username})
  ///////////////////// Logica del TOKEN /////////////////////////////////
  const user = request.user

  console.log('USUARIO EXTRAIDO: ', user)
  

  let blogUserId
  try {
    const blog = await Blog.findById(id)
    blogUserId = blog.user._id.toString()
  } catch (error) {
    return response.status(401).json({error:"Blog no encontrado"})
  }
  
  if(blogUserId !== user.id)
    return response.status(401).json({error:"Operacion de borardo no autorizada para este usuario"})

  try {
    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
  } catch (error) {
    return response.status(401).json({error:"No fue posible la eliminación del blog"})
  }

})

module.exports = blogRouter