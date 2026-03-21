const _ = require('lodash')

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((previous, current) => previous.likes > current.likes ? previous : current)
}

const mostBlogs = (blogs) => {
    const countedBlogs = _.countBy(blogs, 'author')
    const [author, authorBlogs] = _.maxBy(Object.entries(countedBlogs),([author, count]) => count)

    return {
        author,
        blogs: authorBlogs,
    }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = Object.entries(blogsByAuthor).map(([author, authorBlogs]) => {
    const likes = _.sumBy(authorBlogs, 'likes')
    return { author, likes }
  })
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}