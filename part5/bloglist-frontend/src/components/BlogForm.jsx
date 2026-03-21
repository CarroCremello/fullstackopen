import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
        handleBlogs,
        displayBlogForm,
        handleMessage
    }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        console.log('adding blog with title ', blogTitle, ', author ', blogAuthor, ' and url ', blogUrl)

        try {
        const newBlog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        await blogService.add(newBlog)
        const updatedBlogs = await blogService.getAll()
        handleBlogs(updatedBlogs)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        displayBlogForm(false)
        const newMessage = { 
            type: "success",
            text: `${blogTitle} by ${blogAuthor} added`
        }
        handleMessage(newMessage)
        setTimeout(() => {
            handleMessage(null)
        }, 5000)
        } catch {
        console.log("Couldn't add blog")
        const newMessage = { 
            type: "error",
            text: "Couldn't add blog"
        }
        handleMessage(newMessage)
        setTimeout(() => {
            handleMessage(null)
        }, 5000)
        }
    }

    return (
        <>
            <h2>Add blog</h2>
            <form onSubmit={addBlog}>
                <div>
                <label>
                    title
                    <input
                    type="text"
                    value={blogTitle}
                    onChange={({ target }) => setBlogTitle(target.value)}
                    />
                </label>
                <br />
                <label>
                    author
                    <input
                    type="text"
                    value={blogAuthor}
                    onChange={({ target }) => setBlogAuthor(target.value)}
                    />
                </label>
                <br />
                <label>
                    url
                    <input
                    type="text"
                    value={blogUrl}
                    onChange={({ target }) => setBlogUrl(target.value)}
                    />
                </label>
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default BlogForm