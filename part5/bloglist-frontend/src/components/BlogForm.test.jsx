import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

test('form calls event handler with correct title, author and url on submit', async () => {
  blogService.add.mockResolvedValue({})
  blogService.getAll.mockResolvedValue([])

  render(
    <BlogForm
      handleBlogs={vi.fn()}
      displayBlogForm={vi.fn()}
      handleMessage={vi.fn()}
    />
  )

  await userEvent.type(screen.getByLabelText(/title/i), 'New Blog Title')
  await userEvent.type(screen.getByLabelText(/author/i), 'New Author')
  await userEvent.type(screen.getByLabelText(/url/i), 'http://newurl.com')
  await userEvent.click(screen.getByText('Add'))

  expect(blogService.add).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'New Author',
    url: 'http://newurl.com',
  })
})
