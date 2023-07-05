const User = require('../models/user')
const jwt = require('jsonwebtoken')
const util = require('../utils/config')

module.exports = async (request, response, next) => {

  const token = request.token
  console.log('Token desde extracto de User: ', token)
  
  
  if(!token)
    return response.status(401).json({error:"No autorizado"})
  
  let decodedToken
  try {
    decodedToken = jwt.verify(token, util.SECRET_FOR_JWT)
    console.log('XXX decodedToken: ', decodedToken)
  }catch (error) {
    return response.status(401).json({error:"XXX Sesion expirada"})
  }
  
  if(!(decodedToken && decodedToken.username && decodedToken.id))
    return response.status(401).json({error: "No autorizado"})

  request.user = await User.findOne({username: decodedToken.username})

  if(!request.user || request.user._id.toString() !== decodedToken.id)
    return response.status(404).json({error:'Usuario o autorización no valido'})
  

  next()
}