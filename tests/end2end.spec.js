// @ts-check
import { test, expect } from "@playwright/test";

test.describe("App End-to-End Tests", () => {
  // Before each test, open the browser and navigate to the app
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3001");
  });

  test("renders Anecdotes heading", async ({ page }) => {
    // Check if the "Anecdotes" heading is visible on the page
    const heading = page.locator("text=Anecdotes");
    await expect(heading).toBeVisible();
  });

  test("displays a list of anecdotes", async ({ page }) => {
    // Assuming your app has some mock data or is connected to a real backend
    const anecdotes = [
      {
        content: "If it hurts, do it more often",
        id: "47145",
        votes: 33,
      },
      {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 18,
      },
      {
        content:
          "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        id: "69581",
        votes: 8,
      },
    ];

    // For each anecdote, check if the content and votes are displayed correctly

    // Check if the content of the anecdote is visible
    const anecdote1_Content = page.locator(`text=${anecdotes[0].content}`);
    await expect(anecdote1_Content).toBeVisible();
    const anecdote2_Content = page.locator(`text=${anecdotes[1].content}`);
    await expect(anecdote2_Content).toBeVisible();
    const anecdote3_Content = page.locator(`text=${anecdotes[2].content}`);
    await expect(anecdote3_Content).toBeVisible();

    // Check if the vote count for the anecdote is visible
    const voteButton1 = page.locator(`button:has-text("Vote")`).first(); // Adjust this to match the actual button selector
    await expect(voteButton1).toBeVisible();
  });

  test("shows notification after voting", async ({ page }) => {
    // Click the vote button for the first anecdote
    const voteButton = page.locator("text=vote").first();
    await voteButton.click();

    // Check if the notification is displayed with the correct message
    const notification = page.locator("text=You voted");
    await expect(notification).toBeVisible();
  });

  test("Can create a new anecdote", async ({ page }) => {
   // Navigate to the page where the form is rendered
  await page.goto("http://localhost:3001"); // Adjust URL if necessary

  // Locate the input field for the anecdote form
  const anecdoteInput = page.locator('input[name="anecedote"]');

  // Type a new anecdote into the input field
  const newAnecdoteText = "This is a test anecdote";
  await anecdoteInput.fill(newAnecdoteText);

  // Submit the form
  await page.click("button:has-text('create')");

  // Check for the notification message after submission
  const notification = page.locator("text=New anecdote note is created!");
  await expect(notification).toBeVisible();
  });

});

// // @ts-check
// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
