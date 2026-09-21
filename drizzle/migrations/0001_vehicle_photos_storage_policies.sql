CREATE POLICY "Vehicle photos readable" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'vehicle-photos');

CREATE POLICY "Admins upload vehicle photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'vehicle-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update vehicle photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'vehicle-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete vehicle photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'vehicle-photos' AND public.has_role(auth.uid(), 'admin'));