const config = require('./utils/config')

const express = require('express')
const app = express()
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const cleanerConsole = require('./middlewares/cleanerConsole')
const mongoose = require('mongoose')

const Blog = require('./models/blog')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')


mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.json())

app.use(cleanerConsole)
morgan.token('bodyRequest', (request, response)=>{
  return JSON.stringify(request.body)
})
// Y llamamos al middleware Morgan con un mensaje formateado con los tokkens que queremos
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyRequest'))

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)


module.exports = app