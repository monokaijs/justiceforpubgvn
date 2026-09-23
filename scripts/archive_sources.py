"""Download the accessible first-party documents used by the timeline.

Run with: python scripts/archive_sources.py
Raw HTML is stored as .html.txt so browsers display it as text rather than
executing scripts from a third-party page under this site's origin.
"""

from datetime import datetime, timezone
from hashlib import sha256
from pathlib import Path
import json
import subprocess


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "attachments"
OUT.mkdir(parents=True, exist_ok=True)

DOCUMENTS = [
    (
        "pubg-findings-2026-09-23-vi.html.txt",
        "https://pubg.com/vi/news/11155",
        "PUBG official notice, Vietnamese",
    ),
    (
        "pubg-findings-2026-09-23-ko.html.txt",
        "https://www.pubg.com/ko/news/11155",
        "PUBG official notice, Korean",
    ),
    (
        "pubg-asia-stars-event-notice-2026-09-11-vi.html.txt",
        "https://pubg.com/vi/events/notice/10926",
        "PUBG official event notice, Vietnamese",
    ),
    (
        "pubg-asia-stars-web-event-rules.pdf",
        "https://www.pubg.com/static/guide-pubgasiastars/event/PUBG_ASIASTARS_Event_Official_Rules_en.pdf",
        "PUBG official web event rules PDF (different from tournament rulebook)",
    ),
]

retrieved_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
manifest = []
for filename, url, description in DOCUMENTS:
    target = OUT / filename
    subprocess.run(
        ["curl.exe", "--fail", "--location", "--silent", "--show-error", "--max-time", "45", url, "--output", str(target)],
        check=True,
    )
    data = target.read_bytes()
    manifest.append(
        {
            "filename": filename,
            "source_url": url,
            "description": description,
            "capture_method": "raw HTTP response via curl",
            "retrieved_at_utc": retrieved_at,
            "bytes": len(data),
            "sha256": sha256(data).hexdigest(),
        }
    )
    print(f"Saved {filename} ({len(data):,} bytes)")

for filename, url, description in [
    (
        "kakao-notice-2026-09-19-ko.txt",
        "https://bbs-pubg.kakaogames.com/gaia/do/pubg/notice/read?articleId=4372&bbsId=PN001&pageIndex=1",
        "Kakao PUBG repost of KRAFTON notice, visible article text, Korean",
    ),
    (
        "kakao-notice-2026-09-20-ko.txt",
        "https://bbs-pubg.kakaogames.com/gaia/do/pubg/notice/read?articleId=4373&bbsId=PN001&objCate1=223&pageIndex=1",
        "Kakao PUBG repost of KRAFTON notice, visible article text, Korean",
    ),
]:
    target = OUT / filename
    if not target.exists():
        continue
    data = target.read_bytes()
    header = data.decode("utf-8").splitlines()[1]
    captured_at = header.removeprefix("Captured from visible article text on ")
    manifest.append(
        {
            "filename": filename,
            "source_url": url,
            "description": description,
            "capture_method": "browser-captured visible article text; not raw server HTML",
            "retrieved_at_utc": captured_at,
            "bytes": len(data),
            "sha256": sha256(data).hexdigest(),
        }
    )

(OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

evidence_manifest = []
for path in sorted((OUT / "evidences").glob("*.png")):
    data = path.read_bytes()
    evidence_manifest.append(
        {
            "filename": path.name,
            "path": f"/attachments/evidences/{path.name}",
            "origin": "user-provided; original capture source and date not independently verified",
            "observed_at_utc": retrieved_at,
            "bytes": len(data),
            "sha256": sha256(data).hexdigest(),
        }
    )
(OUT / "evidence-manifest.json").write_text(
    json.dumps(evidence_manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)

campaign_visual = OUT / "himass-tanvuu.png"
if campaign_visual.exists():
    data = campaign_visual.read_bytes()
    (OUT / "visual-manifest.json").write_text(
        json.dumps(
            {
                "filename": campaign_visual.name,
                "path": f"/attachments/{campaign_visual.name}",
                "origin": "user-provided campaign visual; not offered as evidence or an official PUBG image",
                "observed_at_utc": retrieved_at,
                "bytes": len(data),
                "sha256": sha256(data).hexdigest(),
            },
            ensure_ascii=False,
            indent=2,
        ) + "\n",
        encoding="utf-8",
    )
