-- ═══════════════════════════════════════════════
-- MIGRATION: Site settings table + Car price update
-- Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════════

-- Site settings table for cross-device persistence
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can upsert site settings"
  ON site_settings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update site settings"
  ON site_settings FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Update car prices from Cars.pdf
UPDATE cars SET
  price_per_day = 600, price_weekly = 4800, price_monthly = 16000
WHERE name ILIKE '%Nissan Patrol%';

UPDATE cars SET
  price_per_day = 320, price_weekly = 1800, price_monthly = 7000
WHERE name ILIKE '%Jetour T2%';

UPDATE cars SET
  price_per_day = 180, price_weekly = 1300, price_monthly = 5100
WHERE name ILIKE '%Audi A3%';

-- Add MG GT if not already in DB
INSERT INTO cars (name, year, price_per_day, price_weekly, price_monthly, visible)
SELECT 'MG GT', 2024, 90, 600, 2000, true
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE name ILIKE '%MG GT%');
