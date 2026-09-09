import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=> {
  await page.goto('https://www.saucedemo.com');
});

test('амжилттай нэвтрэх', async({page})=>{
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button',{name:'Login' }).click();

  await expect(page.getByText('Products',{exact:true})).toBeVisible();
  await expect(page).toHaveURL(/inventory.html/);

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

test('амжилтгүй нэвтрэх',async({page})=> {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    /Username and password do not match/
  );

  await expect(page).not.toHaveURL(/inventory.html/);
});

test('нэвтэрсний дараа бараа сагслах', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Products')).toBeVisible();

  await page
    .getByRole('button',{ name:'Add to cart'})
    .first()
    .click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('.shopping_cart_link').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});
