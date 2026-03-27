const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })
})