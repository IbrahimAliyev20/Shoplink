import * as z from 'zod';

export const addressSchema = z.object({
  title: z.string().min(1, 'Ünvan başlığı tələb olunur'),
  country: z.string().min(1, 'Ölkə tələb olunur'),
  city: z.string().min(1, 'Şəhər tələb olunur'),
  address: z.string().min(1, 'Ünvan tələb olunur'),
});

export type AddressFormData = z.infer<typeof addressSchema>;