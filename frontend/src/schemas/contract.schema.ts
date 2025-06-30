import { z } from "zod/v4";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const contractSchema = z
  .object({
    contractType: z.enum(["CONTRACT", "PERMANENT"], "Contract type is required"),

    startDate: z.string().refine(
      (val) => {
        const d = new Date(val);
        return !isNaN(d.getTime()) && d >= today;
      },
      { message: "Start date must be today or in the future" }
    ),

    finishDate: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const d = new Date(val);
          return !isNaN(d.getTime());
        },
        { message: "Finish date must be a valid date" }
      ),

    contractEmploymentType: z.enum(
      ["FULL_TIME", "PART_TIME"],
      "Employment type is required"
    ),

    hoursPerWeek: z
      .number()
      .gte(1, "Must be at least 1 hour")
      .lte(38, "Cannot exceed 38 hours"),
  })
  .refine(
    (data) => {
      if (!data.finishDate) return true;
      const start = new Date(data.startDate);
      const finish = new Date(data.finishDate);
      return finish > start;
    },
    {
      path: ["finishDate"],
      message: "Finish date must be after start date",
    }
  );
