import { z } from "zod/v4";

export const contractSchema = z
  .object({
    contractType: z.enum(["CONTRACT", "PERMANENT"], "Contract type is required"),
    startDate: z
      .date()
      .refine((date) => date >= new Date(), "Start date must be today or in future"),
    finishDate: z.date().optional(),
    contractEmploymentType: z.enum(
      ["FULL_TIME", "PART_TIME"],
      "Employment type is required"
    ),
    hoursPerWeek: z
      .number()
      .gte(1, "Must be at least 1 hour")
      .lte(38, "Cannot exceed 38 hours"),
  })
  .refine((data) => !data.finishDate || data.finishDate > data.startDate, {
    path: ["finishDate"],
    error: "Finish date must be after start date",
  });
