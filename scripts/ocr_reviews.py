import pytesseract
from PIL import Image
import json
import os

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
os.environ['TESSDATA_PREFIX'] = r'C:\Users\Win\AppData\Local\Temp\tessdata'

with open('data/reviews.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

reviews = data['reviews']

target_kids = [96, 50, 47, 44, 42, 41, 40, 39, 38, 33, 32, 29, 26, 24, 22, 21, 20, 19, 16, 15, 14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 2]

updated = 0
ocr_short = 0
failed = 0
no_image = 0
results = []

for review in reviews:
    kid = review.get('k_id')
    if kid not in target_kids:
        continue

    img_field = review.get('image', '')
    if not img_field:
        results.append({'k_id': kid, 'status': 'NO_IMAGE', 'chars': 0, 'before': len(review.get('content', ''))})
        no_image += 1
        continue

    image_path = os.path.join('frontend', 'public', img_field.lstrip('/'))
    if not os.path.exists(image_path):
        results.append({'k_id': kid, 'status': 'NO_IMAGE', 'chars': 0, 'before': len(review.get('content', ''))})
        no_image += 1
        continue

    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img, lang='kor')
        cleaned = text.strip().replace('\n\n\n', '\n\n').replace('\n\n', '\n')

        old_len = len(review.get('content', ''))

        if len(cleaned) > old_len and len(cleaned) > 20:
            review['content'] = cleaned
            review['contentSource'] = 'ocr'
            updated += 1
            results.append({'k_id': kid, 'status': 'UPDATED', 'chars': len(cleaned), 'before': old_len, 'preview': cleaned[:80]})
        else:
            review['contentSource'] = 'image'
            ocr_short += 1
            results.append({'k_id': kid, 'status': 'OCR_SHORT', 'chars': len(cleaned), 'before': old_len, 'preview': cleaned[:50] if cleaned else '(empty)'})
    except Exception as e:
        review['contentSource'] = 'image'
        failed += 1
        results.append({'k_id': kid, 'status': f'FAILED: {e}', 'chars': 0, 'before': len(review.get('content', ''))})

with open('data/reviews.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

import shutil
shutil.copy('data/reviews.json', 'frontend/data/reviews.json')

print(f"\n=== OCR 결과 ===")
print(f"UPDATED: {updated}개 (OCR 성공, content 교체)")
print(f"OCR_SHORT: {ocr_short}개 (OCR 결과가 기존보다 짧아서 유지)")
print(f"FAILED: {failed}개 (에러)")
print(f"NO_IMAGE: {no_image}개 (이미지 없음)")
print(f"\n상세:")
for r in results:
    status = r['status']
    preview = r.get('preview', '')
    if preview:
        print(f"  k_id={r['k_id']}: {status} — {r.get('before', '?')}자→{r['chars']}자 | \"{preview}...\"")
    else:
        print(f"  k_id={r['k_id']}: {status} — {r.get('before', '?')}자→{r['chars']}자")
