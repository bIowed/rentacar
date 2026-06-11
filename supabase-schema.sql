-- Run this SQL in your Supabase SQL editor to set up the database

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  year INTEGER,
  price_per_day NUMERIC(10, 2),
  price_weekly NUMERIC(10, 2),
  price_monthly NUMERIC(10, 2),
  image_urls TEXT[] DEFAULT '{}',
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  car_name TEXT,
  rental_type TEXT,
  rental_qty INTEGER DEFAULT 1,
  rental_total NUMERIC(10, 2),
  fingerprint JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Public can read visible cars
CREATE POLICY "Public can view visible cars"
  ON cars FOR SELECT
  USING (visible = true);

-- Public can insert reservations
CREATE POLICY "Public can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

-- Admin can do everything (using anon key + admin password for simplicity)
-- In production, use Supabase Auth with proper roles
CREATE POLICY "Admin full access to cars"
  ON cars FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to reservations"
  ON reservations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert default cars
INSERT INTO cars (name, year, price_per_day, price_weekly, price_monthly, visible) VALUES
  ('Nissan Patrol', 2026, 350, 2100, 7000, true),
  ('Audi A3', 2024, 250, 1500, 5000, true),
  ('Jetour T2', 2025, 200, 1200, 4000, true);

-- ═══════════════════════════════════════════════
-- MIGRATIONS: Add columns to existing tables
-- Run if tables already exist without these columns
-- ═══════════════════════════════════════════════
-- ALTER TABLE cars ADD COLUMN IF NOT EXISTS price_weekly NUMERIC(10, 2);
-- ALTER TABLE cars ADD COLUMN IF NOT EXISTS price_monthly NUMERIC(10, 2);
-- ALTER TABLE reservations ADD COLUMN IF NOT EXISTS fingerprint JSONB DEFAULT '{}';
-- ALTER TABLE reservations ADD COLUMN IF NOT EXISTS rental_type TEXT;
-- ALTER TABLE reservations ADD COLUMN IF NOT EXISTS rental_qty INTEGER DEFAULT 1;
-- ALTER TABLE reservations ADD COLUMN IF NOT EXISTS rental_total NUMERIC(10, 2);

-- ═══════════════════════════════════════════════
-- STORAGE BUCKET SETUP (run in SQL editor)
-- ═══════════════════════════════════════════════

-- Create the bucket (if not exists via dashboard)
-- Go to Storage → Create bucket → name: "car images" → public bucket

-- Allow public SELECT on car images bucket
CREATE POLICY "Public can view car images"
ON storage.objects FOR SELECT
USING (bucket_id = 'car images');

-- Allow anon INSERT on car images bucket (for admin uploads)
CREATE POLICY "Anon can upload car images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'car images');

-- Allow anon UPDATE/DELETE on car images bucket (for admin management)
CREATE POLICY "Anon can manage car images"
ON storage.objects FOR ALL
USING (bucket_id = 'car images')
WITH CHECK (bucket_id = 'car images');

-- ═══════════════════════════════════════════════
-- SITE SETTINGS TABLE (cross-device persistence)
-- ═══════════════════════════════════════════════

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

-- ═══════════════════════════════════════════════
-- CAR PRICE UPDATE (from Cars.pdf)
-- ═══════════════════════════════════════════════

UPDATE cars SET
  price_per_day = 600, price_weekly = 4800, price_monthly = 16000
WHERE name ILIKE '%Nissan Patrol%';

UPDATE cars SET
  price_per_day = 320, price_weekly = 1800, price_monthly = 7000
WHERE name ILIKE '%Jetour T2%';

UPDATE cars SET
  price_per_day = 180, price_weekly = 1300, price_monthly = 5100
WHERE name ILIKE '%Audi A3%';

-- Insert MG GT if not exists
INSERT INTO cars (name, year, price_per_day, price_weekly, price_monthly, visible)
SELECT 'MG GT', 2024, 90, 600, 2000, true
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE name ILIKE '%MG GT%');
