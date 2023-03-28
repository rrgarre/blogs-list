module.exports = (request, response, next) => {
  const requestToken = request.get('authorization')
  if(requestToken && requestToken.toLowerCase().startsWith('bearer '))
    request.token = requestToken.substring(7)
    
  // console.log('Request modificada: ', request.token)
  
  next()
}