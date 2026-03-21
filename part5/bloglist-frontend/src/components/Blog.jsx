import { useState } from "react"

const Blog = ({ blog, handleLike }) => {

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
        </>
      )}


    </div>  
  )
}

  


export default Blog