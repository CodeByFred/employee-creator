import { z } from "zod/v4";

export const employeeSchema = z.object({
  givenName: z.string().min(1, "Required"),
  surname: z.string().min(1, "Required"),
  email: z.email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
  address: z.string().min(1, "Required"),
});
