const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (suma, blog) => {
    return suma + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const recordLikes = Math.max(...blogs.map(blog=>blog.likes))
  const mejorBlog = blogs.find(blog=>blog.likes===recordLikes)
  return {
    "author": mejorBlog.author,
    "title": mejorBlog.title,
    "likes": mejorBlog.likes
  }
}

const mostBlogs = (blogs) => {
  console.log('XXXXX:')
  const recontador = (temp, blog) => {
    if(!temp.find(a=>a.author===blog.author)){
      temp = temp.concat({
        author: blog.author,
        blogs: 0
      })
    }
    temp.map((t) => {
      return t.author === blog.author
        ? t.blogs ++
        : t.blogs
    })
    
    return temp
  }

  const acumulado = []
  const recuento = blogs.reduce(recontador, acumulado)

  const recordBlogs = Math.max(...recuento.map((r)=>r.blogs))  
  const bestAuthor = recuento.find(a => a.blogs === recordBlogs)
  
  console.log('_________:', bestAuthor)
  return bestAuthor
}

const mostLikes = (blogs) => {
  const recontador = (temp, blog) => {
    if(!temp.find(a=>a.author===blog.author)){
      temp = temp.concat({
        author: blog.author,
        likes: 0
      })
    }
    temp.map((t) => {
      return t.author === blog.author
        ? t.likes += blog.likes
        : t.likes
    })
    
    return temp
  }

  const acumulado = []
  const recuento = blogs.reduce(recontador, acumulado)

  const recordLikes = Math.max(...recuento.map((r)=>r.likes))  
  const bestAuthor = recuento.find(a => a.likes === recordLikes)
  
  console.log('_________:', bestAuthor)
  return bestAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}