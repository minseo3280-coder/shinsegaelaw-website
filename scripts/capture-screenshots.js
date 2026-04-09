const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = path.join(__dirname, '..', 'docs', 'screenshots');

fs.mkdirSync(OUT, { recursive: true });

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 375, height: 812, isMobile: true, hasTouch: true };

// Desktop screenshots
const desktopPages = [
  // Main sections
  { name: 'main-hero', url: '/', wait: 3000 },
  { name: 'main-trust', url: '/', wait: 2000, scroll: 900 },
  { name: 'main-ceo', url: '/', wait: 2000, scroll: 1800 },
  { name: 'main-cases', url: '/', wait: 2000, scroll: 2800 },
  { name: 'main-contact', url: '/', wait: 2000, scroll: 5500 },

  // About
  { name: 'about-greeting', url: '/about/greeting', wait: 2000, scroll: 350 },
  { name: 'about-tradition', url: '/about/tradition', wait: 2000, scroll: 350 },
  { name: 'about-system', url: '/about/system', wait: 2000, scroll: 350 },
  { name: 'about-location', url: '/about/location', wait: 2000, scroll: 350 },

  // Lawyers & Teams
  { name: 'lawyers-list', url: '/about/lawyers', wait: 2000, scroll: 350 },
  { name: 'lawyer-detail', url: '/about/lawyers/1', wait: 2000, scroll: 0 },
  { name: 'team-detail', url: '/about/teams/divorce-general', wait: 2000, scroll: 350 },

  // Cases & Reviews
  { name: 'cases-list', url: '/cases', wait: 2000, scroll: 350 },
  { name: 'case-detail', url: '/cases/1', wait: 2000, scroll: 0 },
  { name: 'reviews-list', url: '/reviews', wait: 2000, scroll: 350 },
  { name: 'review-detail', url: '/reviews/1', wait: 2000, scroll: 0 },

  // Practice
  { name: 'practice-divorce', url: '/practice/divorce', wait: 2000, scroll: 350 },
  { name: 'practice-alimony', url: '/practice/divorce/alimony', wait: 2000, scroll: 350 },
  { name: 'practice-litigation', url: '/practice/divorce/litigation', wait: 2000, scroll: 350 },

  // Media
  { name: 'news', url: '/news', wait: 2000, scroll: 350 },
  { name: 'press-list', url: '/press', wait: 2000, scroll: 350 },
  { name: 'press-detail', url: '/press/1', wait: 2000, scroll: 0 },
  { name: 'media-channel', url: '/media/channel', wait: 2000, scroll: 350 },
  { name: 'column-list', url: '/media/column', wait: 2000, scroll: 350 },

  // Consultation
  { name: 'consultation', url: '/consultation', wait: 2000, scroll: 350 },
  { name: 'consultation-board', url: '/consultation/board', wait: 2000, scroll: 350 },

  // Common UI
  { name: 'floating-cta', url: '/', wait: 2000, scroll: 400 },
];

// Mobile screenshots
const mobilePages = [
  { name: 'mobile-hero', url: '/', wait: 3000 },
  { name: 'mobile-cases', url: '/cases', wait: 2000, scroll: 200 },
  { name: 'mobile-lawyers', url: '/about/lawyers', wait: 2000, scroll: 200 },
  { name: 'mobile-menu', url: '/', wait: 2000, clickMenu: true },
  { name: 'mobile-practice', url: '/practice/divorce', wait: 2000, scroll: 200 },
  { name: 'mobile-press', url: '/press', wait: 2000, scroll: 200 },
  { name: 'mobile-review', url: '/reviews/1', wait: 2000, scroll: 0 },
  { name: 'mobile-consultation', url: '/consultation', wait: 2000, scroll: 200 },
];

async function capture(page, item, viewport) {
  const fileName = `${item.name}.png`;
  const filePath = path.join(OUT, fileName);

  await page.setViewport(viewport);
  await page.goto(`${BASE}${item.url}`, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await new Promise(r => setTimeout(r, item.wait || 2000));

  if (item.scroll) {
    await page.evaluate((y) => window.scrollTo(0, y), item.scroll);
    await new Promise(r => setTimeout(r, 800));
  }

  if (item.clickMenu) {
    // Click hamburger menu for mobile
    await page.click('button[aria-label="메뉴 열기"]').catch(() => {});
    await new Promise(r => setTimeout(r, 600));
  }

  await page.screenshot({ path: filePath, type: 'png', fullPage: false });
  console.log(`  ✅ ${fileName}`);
}

(async () => {
  console.log('🚀 Starting screenshot capture...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Desktop screenshots
  console.log('📱 Desktop screenshots (1440x900):');
  for (const item of desktopPages) {
    try {
      await capture(page, item, DESKTOP);
    } catch (e) {
      console.log(`  ❌ ${item.name}: ${e.message}`);
    }
  }

  // Mega menu screenshot (hover)
  try {
    await page.setViewport(DESKTOP);
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    // Hover over a menu tab to trigger megamenu
    const navItems = await page.$$('nav a, nav button');
    if (navItems.length > 1) {
      await navItems[1].hover();
      await new Promise(r => setTimeout(r, 500));
    }
    await page.screenshot({ path: path.join(OUT, 'megamenu.png'), type: 'png' });
    console.log('  ✅ megamenu.png');
  } catch (e) {
    console.log(`  ❌ megamenu: ${e.message}`);
  }

  // Search screenshot
  try {
    await page.setViewport(DESKTOP);
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    const searchBtn = await page.$('button[aria-label*="검색"]');
    if (searchBtn) {
      await searchBtn.click();
      await new Promise(r => setTimeout(r, 800));
    }
    await page.screenshot({ path: path.join(OUT, 'search.png'), type: 'png' });
    console.log('  ✅ search.png');
  } catch (e) {
    console.log(`  ❌ search: ${e.message}`);
  }

  // Mobile screenshots
  console.log('\n📱 Mobile screenshots (375x812):');
  for (const item of mobilePages) {
    try {
      await capture(page, item, MOBILE);
    } catch (e) {
      console.log(`  ❌ ${item.name}: ${e.message}`);
    }
  }

  await browser.close();

  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png'));
  console.log(`\n🎉 Done! ${files.length} screenshots saved to docs/screenshots/`);
})();
