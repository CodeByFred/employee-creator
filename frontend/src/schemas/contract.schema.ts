import { z } from "zod/v4";

export const contractSchema = z.object({
  contractType: z.enum(["CONTRACT", "PERMANENT"], "Contract type is required"),
  startDate: z.iso.date(),
  finishDate: z.iso.date().optional(),
  contractEmploymentType: z.enum(
    ["FULL_TIME", "PART_TIME"],
    "Employment type is required"
  ),
  hoursPerWeek: z.number().gte(1),
});
