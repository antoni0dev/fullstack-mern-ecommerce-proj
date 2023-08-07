import { z } from "zod";

export const shippingSchema = z.object({
  country: z.string().trim().min(2, {
    message: "A country name must consist of at least 2 characters",
  }),
  city: z.string().trim().min(2, {
    message: "A city name must consist of at least 2 characters",
  }),
  streetAddress: z.string().trim().min(2, {
    message: "A street name must consist of at least 2 characters",
  }),
  postalCode: z
    .string()
    .min(4, { message: "A postal code must consist of at least 4 characters" }),
});

export type Shipping = z.infer<typeof shippingSchema>;
