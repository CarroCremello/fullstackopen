import { useState } from "react"

const Blog = ({ blog }) => {

  const [open, setOpen] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          <button>Like</button>
          <br />
          {blog.user.name}
        </>
      )}


    </div>  
  )
}

  


export default Blog