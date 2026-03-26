import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('shows url and likes after clicking the View button', async () => {
  render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} user={null} />)

  await userEvent.click(screen.getByText('View'))

  expect(screen.getByText(/http:\/\/testurl\.com/)).toBeDefined()
  expect(screen.getByText(/42/)).toBeDefined()
})

test('calls like handler twice when like button is clicked twice', async () => {
  const handleLike = vi.fn()
  render(<Blog blog={blog} handleLike={handleLike} handleRemove={() => {}} user={null} />)

  await userEvent.click(screen.getByText('View'))
  await userEvent.click(screen.getByText('Like'))
  await userEvent.click(screen.getByText('Like'))

  expect(handleLike).toHaveBeenCalledTimes(2)
})
