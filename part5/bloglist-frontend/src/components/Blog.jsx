import { useState } from "react"

const Blog = ({ blog, handleLike, handleRemove, user }) => {

  const [open, setOpen] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id
    }

    handleLike(updatedBlog)
  }

  const removeBlog = () => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      handleRemove(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {!open && <button onClick={() => setOpen(true)}>View</button>}
      {open && (
        <>
          <button onClick={() => setOpen(false)}>Close</button>
          <br />
          {blog.url}
          <br />
          Likes : {blog.likes}
          <button onClick={addLike}>Like</button>
          <br />
          {blog.user?.name}
          {user?.id === blog.user?.id && <button onClick={removeBlog}>Remove</button>}
        </>
      )}


    </div>
  )
}

export default Blog