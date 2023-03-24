const loginRouter = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')

loginRouter.post('/', async (request,response) => {

  const body = request.body

  const user = await User.findOne({username: body.username})
  
  // const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(!(passwordCorrect && user))
    return response.status(401).json({error: 'Usuario o contraseña invalidos'})
    
  const dataForToken = {
    id: user._id,
    username: user.username
  }  

  const token = jwt.sign(
    dataForToken, 
    config.SECRET_FOR_JWT, 
    {expiresIn: 60}
  )

  response.json({
    token, 
    username: user.username,
    name: user.name
  })
  
  // response.send('asd')
})

module.exports= loginRouter