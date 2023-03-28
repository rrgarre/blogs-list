const blogRouter = require('express').Router()
const util = require('../utils/config')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {

  const body = request.body
  // const token = getToken(request)
  // Gracias al middleware "extractorToken", el token viene PARSEADO en la request
  const token = request.token
  
  if(!token)
    return response.status(401).json({error:"No autorizado"})
  
  let decodedToken
  try {
    decodedToken = jwt.verify(token, util.SECRET_FOR_JWT)
    console.log(decodedToken)
  }catch (error) {
    return response.status(401).json({error:"Sesion expirada"})
  }
  
  if(!(decodedToken && decodedToken.username))
    return response.status(401).json({error: "No autorizado"})
  const user = await User.findOne({username: decodedToken.username})
  
  const blog = new Blog({
    title: body.title,
    // author: body.author,
    author: decodedToken.username,
    url: body.url,
    likes: body.likes,
    user: decodedToken._id
  })  

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog)
})

// FUNCION PARA EXTRAER EL TOKEN DE LA REQUEST
const getToken = (request) => {
  console.log('XXX: Desde funcion aparte')
  
  const requestToken = request.get('authorization')
  if(requestToken && requestToken.toLowerCase().startsWith('bearer '))
    return requestToken.substring(7)
  return null
}


module.exports = blogRouter