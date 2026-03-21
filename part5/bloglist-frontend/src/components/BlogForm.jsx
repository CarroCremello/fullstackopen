const BlogForm = ({
   blogTitle,
   blogAuthor,
   blogUrl,
   handleBlogTitle,
   handleBlogAuthor,
   handleBlogUrl,
   handleSubmit
  }) => {
    return (
        <>
            <h2>Add blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    title
                    <input
                    type="text"
                    value={blogTitle}
                    onChange={handleBlogTitle}
                    />
                </label>
                <br />
                <label>
                    author
                    <input
                    type="text"
                    value={blogAuthor}
                    onChange={handleBlogAuthor}
                    />
                </label>
                <br />
                <label>
                    url
                    <input
                    type="text"
                    value={blogUrl}
                    onChange={handleBlogUrl}
                    />
                </label>
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default BlogForm