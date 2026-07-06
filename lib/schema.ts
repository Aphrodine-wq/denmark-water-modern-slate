// Denmark Water Association — staff backend schema.
// Kept as a TS string (not a .sql file read via fs) so it's reliably
// bundled into the serverless function — Next.js doesn't trace raw
// fs.readFileSync() path strings the way it traces imports.
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS staff_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notice (
  id INTEGER PRIMARY KEY DEFAULT 1,
  active BOOLEAN NOT NULL DEFAULT false,
  label TEXT NOT NULL DEFAULT 'Service Notice',
  message TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT notice_single_row CHECK (id = 1)
);
INSERT INTO notice (id, active, label, message)
VALUES (1, false, 'Service Notice', '')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS requests (
  id SERIAL PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('leak', 'service')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  request_type TEXT,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;
