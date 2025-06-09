import { z } from "zod/v4";

export const contractSchema = z.object({
  contractType: z.templateLiteral(
    [z.enum(["CONTRACT", "PERMANENT"])],
    "Contract type is required"
  ),

  startDate: z.iso.date(),

  finishDate: z.iso.date().optional(),

  contractEmploymentType: z.templateLiteral(
    [z.enum(["FULL_TIME", "PART_TIME"])],
    "Employment type is required"
  ),

  hours: z.string().regex(/^[1-9]\d*$/, "Minimum 1 hour required"),
});
