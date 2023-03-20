const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  return response.status(200).json(users)
})

userRouter.post('/', async (request,response, next) => {
  const body = request.body
  if(!body.password || body.password.length < 3){
    const error = {
      name: 'ValidationError',
      // message: 'password missed or too short'
      message: body.password
      ? 'Pon la pass más larga hombre...'
      : 'Tienes que poner alguna password'
    }
    return next(error)
  }
    
  const saltRound = 10
  const hash = await bcrypt.hash(body.password, saltRound)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: hash
  })
  // console.log(await bcrypt.hash(body.password, saltRound))
  
  let savedUser
  try {
    savedUser = await user.save()
    return response.status(200).json(savedUser)
  } catch (error) {
    return next(error)
  }
})

module.exports = userRouter