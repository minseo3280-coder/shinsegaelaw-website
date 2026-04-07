const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const press = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'press.json'), 'utf-8'));

// Filter YTN 라디오 articles
const ytnArticles = press.articles.filter(a => a.source === 'YTN 라디오');
console.log(`Found ${ytnArticles.length} YTN 라디오 articles`);

const BATCH_SIZE = 10;
const BATCH_DELAY = 500;
const BASE_URL = 'https://www.shinsegaelaw.kr/mediaReport/press_view.php?k_id=';

async function fetchYouTubeId(k_id) {
  const url = BASE_URL + k_id;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await res.text();

    // Look for youtube.com/redirect?...&v=VIDEO_ID or youtube.com/watch?v=VIDEO_ID
    // Also check for youtube.com/embed/VIDEO_ID
    let videoId = null;

    // Pattern 1: youtube.com/redirect?...v=VIDEO_ID
    const redirectMatch = html.match(/youtube\.com\/redirect[^"'\s]*[?&]v=([a-zA-Z0-9_-]{11})/);
    if (redirectMatch) {
      videoId = redirectMatch[1];
    }

    // Pattern 2: youtube.com/watch?v=VIDEO_ID
    if (!videoId) {
      const watchMatch = html.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
      if (watchMatch) videoId = watchMatch[1];
    }

    // Pattern 3: youtube.com/embed/VIDEO_ID
    if (!videoId) {
      const embedMatch = html.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) videoId = embedMatch[1];
    }

    // Pattern 4: youtu.be/VIDEO_ID
    if (!videoId) {
      const shortMatch = html.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      if (shortMatch) videoId = shortMatch[1];
    }

    return videoId;
  } catch (err) {
    console.error(`  Error fetching k_id=${k_id}: ${err.message}`);
    return null;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const mapping = {};
  let found = 0;
  let notFound = 0;

  for (let i = 0; i < ytnArticles.length; i += BATCH_SIZE) {
    const batch = ytnArticles.slice(i, i + BATCH_SIZE);

    const results = await Promise.all(
      batch.map(async (article) => {
        const videoId = await fetchYouTubeId(article.k_id);
        return { k_id: article.k_id, videoId };
      })
    );

    for (const { k_id, videoId } of results) {
      if (videoId) {
        mapping[String(k_id)] = videoId;
        found++;
      } else {
        notFound++;
      }
    }

    const processed = Math.min(i + BATCH_SIZE, ytnArticles.length);
    if (processed % 50 === 0 || processed === ytnArticles.length) {
      console.log(`Progress: ${processed}/${ytnArticles.length} processed | Found: ${found} | Not found: ${notFound}`);
    }

    // Delay between batches (skip after last batch)
    if (i + BATCH_SIZE < ytnArticles.length) {
      await sleep(BATCH_DELAY);
    }
  }

  const output = { mapping };
  const outPath = path.join(DATA_DIR, 'press_youtube_ids.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\nDone! Saved ${found} YouTube IDs to ${outPath}`);
  console.log(`Articles with YouTube: ${found}`);
  console.log(`Articles without YouTube: ${notFound}`);
}

main().catch(console.error);
