const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.status(200).json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogRouter.post('/', async (request, response) => {

  const body = request.body
  // const blog = new Blog(request.body)

  const user = await User.findOne({})
  
  const blog = new Blog({
    title: body.title,
    // author: body.author,
    author: user.name,
    url: body.url,
    likes: body.likes,
    user: user._id
  })  

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog)
})


module.exports = blogRouter