import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test Blog Title',
  author: 'Test Author',
  url: 'http://testurl.com',
  likes: 42,
  user: { id: '1', name: 'Test User' }
}

test('renders title and author, but not url or likes by default', () => {
  render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} user={null} />)

  expect(screen.getByText(/Test Blog Title/)).toBeDefined()
  expect(screen.getByText(/Test Author/)).toBeDefined()

  const details = document.querySelector('.blog-details')
  expect(details).toBeNull()
})
