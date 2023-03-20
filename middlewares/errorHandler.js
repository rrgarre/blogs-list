module.exports = (error, request, response, next) => {

  console.log('Error de tipo: ', error.name)
  console.log('Mensage: ', error.message)
  if(error.name === 'ValidationError')
    return response.status(401).json({errorType: error.name, errorMessage: error.message})
  if(error.name === 'MongoServerError')
    return response.status(401).json({errorType: error.name, errorMessage: error.message})

  console.log('Pasamaos el error al siguiente middleware')
  next(error)
}