#!/usr/bin/env bash
# neonburro-shop · PHASE 1 · image migration
# SENTINEL: NB_SHOP_IMG_MIGRATE_V1
#
# WHAT THIS DOES
#   1. Renames every numbered file onto the vocabulary the code already declares
#   2. Converts every PNG to WebP at q82. 76MB of catalogue becomes about 3MB
#   3. Splits the four product lines into their own folders
#   4. Moves the nibble wands case out of halfway-nook, where it does not live
#   5. Sweeps unreferenced legacy art in public/ into _to_delete/
#   6. Fixes the OG image filename, which index.html has been pointing at wrong
#
# WHAT IT DOES NOT DO
#   Nothing is deleted. Every original moves to _to_delete/originals-png/ so the
#   full resolution masters stay on disk. Delete that folder yourself when you
#   have looked at the result.
#
# READ THE MAP BELOW BEFORE RUNNING. It is the whole decision.
#
# Run from the repo root:  bash migrate-images.sh

set -euo pipefail
cd "$(dirname "$0")"

SHOP=public/images/shop
KEEP=_to_delete/originals-png
Q=82

mkdir -p "$KEEP" "$SHOP"/{theburroship,neonburro,blanks,horizon,editions,caps,nibble-wands}

say() { printf '  %-40s -> %s\n' "$1" "$2"; }

# convert a png/webp to webp at the target path, then park the original
mv_web() {
  local src="$1" dest="$2"
  [ -f "$src" ] || { echo "  MISSING $src"; return 0; }
  convert "$src" -strip -quality $Q "$dest"
  say "$(basename "$src")" "${dest#$SHOP/}"
  mkdir -p "$KEEP/$(dirname "${src#$SHOP/}")"
  mv "$src" "$KEEP/${src#$SHOP/}"
}

T=$SHOP/tshirts

echo
echo "theburroship. · the airship drawing, eight colorways"
mv_web "$T/raw-milk-the-burroship-t-shirt.png" "$SHOP/theburroship/theburroship-milk.webp"
mv_web "$T/11.png" "$SHOP/theburroship/theburroship-oat.webp"
mv_web "$T/12.png" "$SHOP/theburroship/theburroship-wheat.webp"
mv_web "$T/13.png" "$SHOP/theburroship/theburroship-sage.webp"
mv_web "$T/14.png" "$SHOP/theburroship/theburroship-greengage.webp"
mv_web "$T/15.png" "$SHOP/theburroship/theburroship-persimmon.webp"
mv_web "$T/16.png" "$SHOP/theburroship/theburroship-serviceberry.webp"
mv_web "$T/17.png" "$SHOP/theburroship/theburroship-pinyon.webp"

echo
echo "neonburro. · the burro in glasses, seven colorways"
mv_web "$T/18.png" "$SHOP/neonburro/neonburro-milk.webp"
mv_web "$T/19.png" "$SHOP/neonburro/neonburro-salt.webp"
mv_web "$T/20.png" "$SHOP/neonburro/neonburro-sage.webp"
mv_web "$T/21.png" "$SHOP/neonburro/neonburro-greengage.webp"
mv_web "$T/22.png" "$SHOP/neonburro/neonburro-serviceberry.webp"
mv_web "$T/23.png" "$SHOP/neonburro/neonburro-persimmon.webp"
mv_web "$T/24.png" "$SHOP/neonburro/neonburro-pinyon.webp"

echo
echo "blanks. · no print, same seven colorways"
mv_web "$T/36.png" "$SHOP/blanks/blanks-milk.webp"
mv_web "$T/37.png" "$SHOP/blanks/blanks-salt.webp"
mv_web "$T/38.png" "$SHOP/blanks/blanks-sage.webp"
mv_web "$T/39.png" "$SHOP/blanks/blanks-serviceberry.webp"
mv_web "$T/40.png" "$SHOP/blanks/blanks-greengage.webp"
mv_web "$T/41.png" "$SHOP/blanks/blanks-persimmon.webp"
mv_web "$T/42.png" "$SHOP/blanks/blanks-pinyon.webp"

echo
echo "horizon · the dip dyes. colour rises from the hem"
mv_web "$T/43.png" "$SHOP/horizon/horizon-greengage.webp"
mv_web "$T/44.png" "$SHOP/horizon/horizon-indigo.webp"

echo
echo "editions · eleven illustrated. four characters, each a front and a pocket"
mv_web "$T/25.png" "$SHOP/editions/airship-over-the-rocks.webp"
mv_web "$T/26.png" "$SHOP/editions/airship-night.webp"
mv_web "$T/27.png" "$SHOP/editions/canyon-doorway.webp"
mv_web "$T/28.png" "$SHOP/editions/prairie-dog.webp"
mv_web "$T/29.png" "$SHOP/editions/prairie-dog-pocket.webp"
mv_web "$T/30.png" "$SHOP/editions/diver.webp"
mv_web "$T/31.png" "$SHOP/editions/diver-pocket.webp"
mv_web "$T/32.png" "$SHOP/editions/warbleur.webp"
mv_web "$T/33.png" "$SHOP/editions/warbleur-pocket.webp"
mv_web "$T/34.png" "$SHOP/editions/crab.webp"
mv_web "$T/35.png" "$SHOP/editions/crab-pocket.webp"

echo
echo "caps · the dot on the wordmark is how the two brands were told apart"
mv_web "$SHOP/hats/4.png" "$SHOP/caps/cap-neonburro-greengage.webp"
mv_web "$SHOP/hats/5.png" "$SHOP/caps/cap-neonburro-khaki.webp"
mv_web "$SHOP/hats/6.png" "$SHOP/caps/cap-neonburro-black.webp"
mv_web "$SHOP/hats/7.png" "$SHOP/caps/cap-theburroship-serviceberry.webp"
mv_web "$SHOP/hats/8.png" "$SHOP/caps/cap-theburroship-khaki.webp"
mv_web "$SHOP/hats/9.png" "$SHOP/caps/cap-theburroship-black.webp"

echo
echo "carried · the vessels, and the wands moved out of their folder"
mv_web "$SHOP/halfway-nook/copper-halfwaynook.png"   "$SHOP/halfway-nook/halfway-nook-copper.webp"
mv_web "$SHOP/halfway-nook/titanium-halfwaynook.png" "$SHOP/halfway-nook/halfway-nook-titanium.webp"
mv_web "$SHOP/halfway-nook/nibble-wands-case.webp"   "$SHOP/nibble-wands/nibble-wands-case.webp"

echo
echo "sent · the clue envelopes"
mv_web "$SHOP/digital/digital-clue-envelope-01.png" "$SHOP/digital/clue-envelope-01.webp"
mv_web "$SHOP/digital/digital-clue-envelope-02.png" "$SHOP/digital/clue-envelope-02.webp"
mv_web "$SHOP/digital/digital-clue-envelope-03.png" "$SHOP/digital/clue-envelope-03.webp"
mv_web "$SHOP/digital/digital-clue-envelope-04.png" "$SHOP/digital/clue-envelope-04.webp"

# ── the empty shells ────────────────────────────────────────────────────────
rmdir "$T" "$SHOP/hats" 2>/dev/null || true

# ── public root. keep what is referenced, park what is not ──────────────────
echo
echo "public root · sweeping art nothing references"
mkdir -p _to_delete/public-legacy
for f in about-hero-sms.png burro-head-neon-sign.png contact-hero-sms.png \
         main-sms-burro.png order-food-hero-sms.png services-hero-sms.png \
         shopping-burro-head.png vip-hero-sms.png; do
  [ -f "public/$f" ] && { mv "public/$f" _to_delete/public-legacy/; say "$f" "_to_delete/public-legacy/"; }
done

# index.html has pointed og:image at /shop-hero-sms.png since it was written.
# The file on disk is shop-hero-sms-main.png, so every share of this shop has
# rendered without a card. Rename the file rather than the three meta tags.
if [ -f public/shop-hero-sms-main.png ]; then
  mv public/shop-hero-sms-main.png public/shop-hero-sms.png
  say "shop-hero-sms-main.png" "shop-hero-sms.png  (fixes og:image)"
fi

echo
echo "done."
du -sh "$SHOP" "$KEEP" 2>/dev/null
