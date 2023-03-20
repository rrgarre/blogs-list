const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.status(200).json(users)
})

userRouter.post('/', async (request,response) => {
  const body = request.body
  const saltRound = 10
  const hash = await bcrypt.hash(body.password, saltRound)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: hash
  })
  // console.log(await bcrypt.hash(body.password, saltRound))
  
  
  const savedUser = await user.save()
  return response.status(200).json(savedUser)
})

module.exports = userRouter