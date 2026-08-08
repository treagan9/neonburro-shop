// src/data/blindLead.js
// SENTINEL: NB_BLIND_LEAD_V1
//
// The Blind Lead. One canon file for the hunt, the vocabulary, the rules and the
// state of every float. The shop, the board and the product pages all read this,
// so the hunt cannot say one thing on a product card and another on the board.
//
// THE VOCABULARY, USE IT EVERYWHERE
//   blind lead · a real ore vein with no surface outcrop. You cannot see it from
//                above ground. You find it by knowing where to dig. That is the
//                hunt, and that is why it is called that.
//   float      · in prospecting, the loose ore you find downstream that proves a
//                vein exists uphill. Here, one clue. Every piece we make carries
//                one. Follow float and you are walking toward the lead.
//   the board  · what has been found and what is still out. Cue keeps it.
//
// RULES ARE NOT MARKETING, THEY ARE THE PRODUCT
// Real treasure in real mountains has killed people on other people's hunts. The
// rules below exist so this one cannot. They are published, they are dated and
// they land in the public record, which means they cannot be quietly edited
// after somebody gets hurt. If a rule changes, the change is published first.
//
// NO PURCHASE NECESSARY, AND WE MEAN IT STRUCTURALLY
// A prize you can only reach by buying something is a lottery in a lot of US
// states, and beyond the law it is a bad way to treat people. So every float
// released on a product is also published free on the board on a delay. Buying a
// piece buys you time, never access.
//
// No oxford commas, no em dashes.

export const FREE_DELAY_DAYS = 30;

export const HUNT = {
  name: 'The Blind Lead',
  tagline: 'A vein with no outcrop. You do not find it by looking.',
  region: 'The Western Slope, Colorado',
  keeper: 'cue',
  keeperName: 'Cue',
  keeperEpithet: 'The Eye',
  status: 'preparing',
  opensNote: 'Float begins shipping with the first run. The board opens the same day.',
  freeDelayDays: FREE_DELAY_DAYS,
};

export const HOW_IT_WORKS = [
  {
    step: 'Float',
    body: 'Every piece we make carries one clue. It is on the shirt, in the packaging, worked into the object. Some are obvious once you see them. Most are not meant to be seen the first time.',
  },
  {
    step: 'Follow',
    body: 'Float on its own is a fragment. Float next to other float starts pointing somewhere. The board tracks which fragments are in the world and which have been read.',
  },
  {
    step: 'Walk',
    body: 'Everything sits on public land, in daylight, on or beside a maintained trail. If a clue seems to be sending you somewhere dangerous, you have read it wrong. Read the rules before you go anywhere.',
  },
  {
    step: 'Claim',
    body: 'A find gets verified against the record and published with the date. The finder decides whether their name goes on the board. The lead stays where it is until somebody reaches it.',
  },
];

export const RULES = [
  { id: 'public', rule: 'Public land only.', detail: 'Nothing is ever placed on private property, an active mining claim, tribal land or anywhere that needs a permit to enter. If a clue points at a fence, it is not pointing at a fence.' },
  { id: 'onfoot', rule: 'Reachable on foot from a road.', detail: 'Every location sits within a mile of legal parking, on or beside a maintained trail. No scrambling, no climbing, no water crossings, no route finding.' },
  { id: 'daylight', rule: 'Daylight, in season.', detail: 'Nothing is placed where you would need a headlamp, an alpine start or winter gear. The hunt closes when the passes close and reopens when they do.' },
  { id: 'nodigging', rule: 'Nothing is buried.', detail: 'You will never need a shovel, a pick or a metal detector. Do not dig on public land. It is illegal in most of the places this hunt goes.' },
  { id: 'nopurchase', rule: 'No purchase necessary.', detail: 'Every float released on a product is published free on the board after thirty days. Buying a piece buys you a head start. It never buys access.' },
  { id: 'leaveit', rule: 'Leave it better.', detail: 'Pack out more than you brought. If a clue ever asks you to move a rock, disturb a site or cross a closure, it is a fake and we want to know about it.' },
  { id: 'calloff', rule: 'We can call it off.', detail: 'If conditions turn, if somebody gets hurt anywhere near this, or if it stops being fun, the hunt pauses and the locations get published. That promise lives in the record, not just on this page.' },
];

export const FLOATS = [
  { id: 'F-01', carrier: 'two-dollar-clue', state: 'queued', found: null, note: 'The cheapest door into the hunt. This is the one that explains what float is.' },
  { id: 'F-02', carrier: 'theburroship', state: 'queued', found: null, note: 'Worked into the print. Not in the part of the artwork you notice first.' },
  { id: 'F-03', carrier: 'neonburro-tee', state: 'queued', found: null, note: 'The mark is printed a half step off the body. One colorway is off by more than that.' },
  { id: 'F-04', carrier: 'blanks', state: 'queued', found: null, note: 'Nothing is printed on this shirt, so the float is in the packaging.' },
  { id: 'F-05', carrier: 'halfway-nook', state: 'queued', found: null, note: 'Etched low on the wall. Titanium shows it when the light is wrong, copper shows it once the patina comes in.' },
  { id: 'F-06', carrier: 'nibble-wands', state: 'queued', found: null, note: 'On the case, not on the wands.' },
];

export const FLOAT_BY_CARRIER = Object.fromEntries(
  FLOATS.filter((f) => f.carrier).map((f) => [f.carrier, f])
);

export const floatFor = (productId) => FLOAT_BY_CARRIER[productId] || null;

export const floatCounts = () => ({
  out: FLOATS.filter((f) => f.state === 'out').length,
  found: FLOATS.filter((f) => f.state === 'found').length,
  queued: FLOATS.filter((f) => f.state === 'queued').length,
  total: FLOATS.length,
});

export default HUNT;
