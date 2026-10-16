CREATE TABLE public.aanvragen (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('vieren','zakelijk')),
  naam text NOT NULL,
  email text NOT NULL,
  telefoon text,
  datum date NOT NULL,
  personen integer NOT NULL,
  bericht text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.aanvragen TO anon;
GRANT ALL ON public.aanvragen TO service_role;

ALTER TABLE public.aanvragen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous can submit aanvragen"
  ON public.aanvragen
  FOR INSERT
  TO anon
  WITH CHECK (true);
