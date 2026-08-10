# public/images

**One folder is one product.** Everything under `shop/` is a category, every file
inside it is a variant of that category, and any one of them is allowed to be the
cover. Add a photograph and it becomes a variant. Add a folder and it becomes a
line. Nobody picks a hero shot by hand, see `src/data/covers.js`.

```
shop/
  tshirts/
    theburroship/   8   the airship drawing
    neonburro/      7   the mark, printed tonal
    blanks/         7   nothing printed at all
    horizon/        2   dip dyed, colour rising off the hem
    editions/      11   the illustrated ones
  caps/             6   two brands, three colours each
  halfway-nook/     2   copper, titanium
  nibble-wands/     1   the case
  digital/          4   clue envelopes
  rewards-cards/    1   the pay card
```

## Rules

**WebP only.** The catalogue was 76MB of PNG and is now under 4MB. A shop that
takes six seconds to show you a shirt is a shop nobody scrolls.

```
convert in.png -strip -quality 82 out.webp
```

**Square, 1200x1200.** Every product shot in here is square, so the grid never
has to crop and no shirt loses its hem to a container.

**Colourway names are shared across lines.** Sage is Sage on the airship and on a
blank, even though the two dye baths landed a shade apart. That is the product
being honest, not an inconsistency to fix. The nine are: milk, salt, oat, wheat,
sage, greengage, persimmon, serviceberry, pinyon.

**Naming is `<line>-<colourway>.webp`.** `src/data/products-wearable.js` builds
the paths from that pattern, so a file that does not follow it does not appear.

## What is not here any more

`products/`, `profiles/`, `scenes/` and `neon-signs/` were the 2025 catalogue and
the compound mockups. They are gone. If you find them somewhere, you are looking
at `dist/`, which is stale build output and is not the source of anything.
