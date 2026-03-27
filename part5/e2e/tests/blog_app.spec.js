const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: { username: 'testuser', name: 'Test User', password: 'testpassword' }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      const response = await request.post('http://localhost:3003/api/login', {
        data: { username: 'testuser', password: 'testpassword' }
      })
      const user = await response.json()
      await page.evaluate((user) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      }, user)
      await page.reload()
      await expect(page.getByText('Test User is logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Add blog' }).click()

      await page.getByRole('textbox', { name: 'title' }).fill('My Test Blog')
      await page.getByRole('textbox', { name: 'author' }).fill('Test Author')
      await page.getByRole('textbox', { name: 'url' }).fill('http://testblog.com')
      await page.getByRole('button', { name: 'Add' }).click()

      await expect(page.locator('.blog-summary', { hasText: 'My Test Blog' })).toBeVisible()
    })

    describe('When a blog exists', () => {
      beforeEach(async ({ page, request }) => {
        const loginResponse = await request.post('http://localhost:3003/api/login', {
          data: { username: 'testuser', password: 'testpassword' }
        })
        const { token } = await loginResponse.json()
        await request.post('http://localhost:3003/api/blogs', {
          data: { title: 'My Test Blog', author: 'Test Author', url: 'http://testblog.com' },
          headers: { Authorization: `Bearer ${token}` }
        })
        await page.reload()
      })

      test('the blog can be deleted by the user who added it', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'Remove' }).click()
        await expect(page.locator('.blog-summary', { hasText: 'My Test Blog' })).not.toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await expect(page.getByText('Likes : 0')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes : 1')).toBeVisible()
      })

      describe('When logged in as a different user', () => {
        beforeEach(async ({ page, request }) => {
          await request.post('http://localhost:3003/api/users', {
            data: { username: 'otheruser', name: 'Other User', password: 'otherpassword' }
          })
          const loginResponse = await request.post('http://localhost:3003/api/login', {
            data: { username: 'otheruser', password: 'otherpassword' }
          })
          const user = await loginResponse.json()
          await page.evaluate((user) => {
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
          }, user)
          await page.reload()
        })

        test('the delete button is not visible', async ({ page }) => {
          await page.getByRole('button', { name: 'View' }).click()
          await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
        })
      })
    })
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('testuser')
      await page.locator('input[type="password"]').fill('testpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Test User is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('testuser')
      await page.locator('input[type="password"]').fill('wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
})