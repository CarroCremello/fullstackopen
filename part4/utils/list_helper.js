const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0);    
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((previous, current) => previous.likes > current.likes ? previous : current)
}

module.exports = {
  totalLikes,
  favoriteBlog
}