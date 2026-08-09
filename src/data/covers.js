// src/data/covers.js
// SENTINEL: NB_SHOP_COVERS_V1
//
// One folder is one product. Every image in that folder is a variant of it, and
// any one of them is allowed to be the cover.
//
// WHY THIS EXISTS
// Picking a hero shot by hand means somebody has an opinion about which shirt
// is the good shirt, and then that opinion quietly becomes the brand. These are
// naturally dyed in small runs. No colourway is the real one. So the cover is
// chosen for us, from whatever is in the folder, and adding art to a line is the
// only thing anybody has to do.
//
// IT IS PICKED, NOT RANDOM, AND THE DIFFERENCE MATTERS
// A cover that rolls the dice on every render flickers on the grid, breaks the
// share card and makes two people on a call disagree about what they are looking
// at. So the pick is a hash of the product id against the variant list. Stable
// forever, different per line, and it moves on its own the day the list changes.
//
// TO OVERRIDE
// Set `cover` on the product record. The Tack Room writes that field, which is
// the whole reason it is a field rather than a hand edited path.
//
// No oxford commas, no em dashes.

// FNV style, small and stable. Nothing here needs a real hash, it needs the same
// answer on every machine including the build server.
const seed = (s = '') => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

export const imagesOf = (product) => {
  if (!product) return [];
  const fromDesigns = (product.designs || []).map((d) => d.image).filter(Boolean);
  const fromGallery = (product.gallery || []).filter(Boolean);
  const list = [...fromGallery, ...fromDesigns];
  return list.length ? list : [product.featuredImage].filter(Boolean);
};

export const pickCover = (product) => {
  if (product?.cover) return product.cover;
  const list = imagesOf(product);
  if (!list.length) return null;
  return list[seed(product?.id || '') % list.length];
};

// Applied once in products.js so no page has to remember to call it.
export const withCover = (product) => ({ ...product, featuredImage: pickCover(product) });

export default withCover;
