-- docs/shop-inventory.sql
-- SENTINEL: NB_SHOP_INVENTORY_SQL_V1
--
-- Run this in the neonburro Supabase project (the same one Pulse uses).
-- One row per sellable thing. A product with variants gets one row per variant
-- and no product level row, so the shop sums them. A product without variants
-- gets a single row with variant_id null.
--
-- READ IS PUBLIC, WRITE IS NOT. The shop reads this table with whatever key
-- Netlify has. Pulse writes it with the secret key. Never grant write to anon.

create table if not exists public.shop_inventory (
  id          uuid primary key default gen_random_uuid(),
  product_id  text not null,
  variant_id  text,
  on_hand     integer not null default 0 check (on_hand >= 0),
  updated_at  timestamptz not null default now(),
  unique (product_id, variant_id)
);

create index if not exists shop_inventory_product_idx on public.shop_inventory (product_id);

alter table public.shop_inventory enable row level security;

drop policy if exists "shop_inventory public read" on public.shop_inventory;
create policy "shop_inventory public read"
  on public.shop_inventory for select
  to anon, authenticated
  using (true);

-- Writes are service role only, which is the default when no write policy exists.

create or replace function public.touch_shop_inventory()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists shop_inventory_touch on public.shop_inventory;
create trigger shop_inventory_touch
  before update on public.shop_inventory
  for each row execute function public.touch_shop_inventory();

-- Seed every sellable line at zero. Everything is out of stock until Pulse
-- says otherwise, which is the correct default for a store with no boxes in it.
insert into public.shop_inventory (product_id, variant_id, on_hand) values
  ('theburroship',  'milk',         0),
  ('theburroship',  'oat',          0),
  ('theburroship',  'wheat',        0),
  ('theburroship',  'sage',         0),
  ('theburroship',  'greengage',    0),
  ('theburroship',  'persimmon',    0),
  ('theburroship',  'serviceberry', 0),
  ('theburroship',  'pinyon',       0),
  ('neonburro-tee', 'salt',         0),
  ('neonburro-tee', 'milk',         0),
  ('neonburro-tee', 'sage',         0),
  ('neonburro-tee', 'greengage',    0),
  ('neonburro-tee', 'serviceberry', 0),
  ('neonburro-tee', 'persimmon',    0),
  ('neonburro-tee', 'pinyon',       0),
  ('blanks',        null,           0),
  ('nibble-wands',  null,           0),
  ('halfway-nook',  'titanium',     0),
  ('halfway-nook',  'copper',       0)
on conflict (product_id, variant_id) do nothing;
