import { test, expect } from '@playwright/test';

test.describe('Portfolio Website E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('has correct title and meta information', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/David Castro/);

    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');
  });

  test('hero section displays correctly', async ({ page }) => {
    // Check hero section exists using a more specific selector
    const heroSection = page.locator(
      'div.bg-linear-to-br.from-primary-dark.to-primary-light'
    );
    await expect(heroSection).toBeVisible();

    // Check hero title using a more specific selector
    const heroTitle = page.locator('h1:has-text("Engineering Intelligence")');
    await expect(heroTitle).toBeVisible();

    // Check hero description
    await expect(
      page.locator('text=AI Engineer & Full-Stack Developer')
    ).toBeVisible();

    // Check hero image exists
    const heroImage = page.locator('img[alt="My face"]');
    await expect(heroImage).toBeVisible();

    // Check hero image has correct attributes
    await expect(heroImage).toHaveAttribute('src');
    await expect(heroImage).toHaveClass(/rounded-xl/);
  });

  test('skills section displays and functions correctly', async ({ page }) => {
    // Check skills section title
    await expect(
      page.locator('text=Want to see my skills sorted?')
    ).toBeVisible();

    // Check algorithm buttons exist
    const bubbleSortBtn = page.locator('button:has-text("Bubble Sort")');
    const insertionSortBtn = page.locator('button:has-text("Insertion Sort")');
    const mergeSortBtn = page.locator('button:has-text("Merge Sort")');
    const quickSortBtn = page.locator('button:has-text("Quick Sort")');

    await expect(bubbleSortBtn).toBeVisible();
    await expect(insertionSortBtn).toBeVisible();
    await expect(mergeSortBtn).toBeVisible();
    await expect(quickSortBtn).toBeVisible();

    // Check skills bars are visible
    const skillsContainer = page.locator('.flex.flex-wrap.items-end');
    await expect(skillsContainer).toBeVisible();

    // Test sorting functionality
    await bubbleSortBtn.click();

    // Wait for sorting to complete
    await page.waitForTimeout(2000);

    // Check that sorting progress is shown
    await expect(page.locator('text=Sorting step:')).toBeVisible();
    await expect(page.locator('text=Latency:')).toBeVisible();
  });

  test('experience section displays correctly', async ({ page }) => {
    // Check experience section exists (assuming it has a title)
    const experienceSection = page
      .locator('section')
      .filter({ hasText: /Experience|Work|Career/ });
    await expect(experienceSection).toBeVisible();
  });

  test('projects section displays correctly', async ({ page }) => {
    // Check projects section title
    const projectsSection = page.locator(
      'section:has(h2:has-text("Projects"))'
    );
    await expect(projectsSection).toBeVisible();

    // Check project card for EcoViz exists within the section
    const projectCard = projectsSection.locator(
      '[data-testid="project-card"]',
      {
        hasText: 'EcoViz: Personal Carbon Footprint Calculator',
      }
    );
    await expect(projectCard).toBeVisible();

    // Check project title
    await expect(
      projectCard.locator('text=EcoViz: Personal Carbon Footprint Calculator')
    ).toBeVisible();

    // Check project description
    await expect(
      projectCard.locator('text=EcoViz is a web-based application')
    ).toBeVisible();

    // Check tech stack tags
    await expect(projectCard.locator('text=React')).toBeVisible();
    await expect(projectCard.locator('text=TypeScript')).toBeVisible();
    await expect(projectCard.locator('text=Lambda')).toBeVisible();
    await expect(projectCard.locator('text=API Gateway')).toBeVisible();
    await expect(projectCard.locator('text=DynamoDB')).toBeVisible();

    // Check project links
    const liveDemoLink = projectCard.locator('a:has-text("Live Demo")');
    const githubLink = projectCard.locator('a:has-text("GitHub")');

    await expect(liveDemoLink).toBeVisible();
    await expect(githubLink).toBeVisible();

    // Check links have correct href attributes
    await expect(liveDemoLink).toHaveAttribute(
      'href',
      'https://www.ecoviz.xyz/'
    );
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/DavidCs9/carbon-footprint-calculation-service'
    );

    // Check links open in new tab
    await expect(liveDemoLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('blog posts section displays correctly', async ({ page }) => {
    // Check blog section title
    await expect(page.locator('h2:has-text("Blog")')).toBeVisible();

    // Check blog description
    await expect(
      page.locator('text=Thoughts, ideas, and discoveries')
    ).toBeVisible();

    // Check that posts are displayed
    const blogPosts = page.locator('a[href^="/posts/"]');
    await expect(blogPosts.first()).toBeVisible();

    // Check post structure
    const firstPost = blogPosts.first();
    await expect(firstPost.locator('h3')).toBeVisible(); // Post title
    await expect(firstPost.locator('time')).toBeVisible(); // Post date
  });

  test('footer displays correctly', async ({ page }) => {
    // Check footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer text
    await expect(page.locator('text=Made with 💜 by')).toBeVisible();

    // Check LinkedIn link within footer context
    const footerLinkedinLink = footer.locator('a[href*="linkedin.com"]');
    await expect(footerLinkedinLink).toBeVisible();
    await expect(footerLinkedinLink).toHaveText('David Castro');
  });

  test('navigation and links work correctly', async ({ page }) => {
    // Test blog post links
    const firstBlogPost = page.locator('a[href^="/posts/"]').first();
    const postHref = await firstBlogPost.getAttribute('href');

    if (postHref) {
      await firstBlogPost.click();
      await expect(page).toHaveURL(
        new RegExp(`^http://localhost:4321${postHref}$`)
      );

      // Go back to home page
      await page.goto('http://localhost:4321/');
    }
  });

  test('responsive design works on different screen sizes', async ({
    page,
  }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
  });
});
