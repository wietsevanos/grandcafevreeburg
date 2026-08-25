CREATE TABLE public.agenda_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_data text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.agenda_items TO anon;
GRANT SELECT ON public.agenda_items TO authenticated;
GRANT ALL ON public.agenda_items TO service_role;

ALTER TABLE public.agenda_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view agenda items"
ON public.agenda_items
FOR SELECT
TO anon, authenticated
USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_agenda_items_updated_at
BEFORE UPDATE ON public.agenda_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();