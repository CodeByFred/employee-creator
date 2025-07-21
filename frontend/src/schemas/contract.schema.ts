import { z } from "zod/v4";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const contractSchema = z
  .object({
    contractType: z.enum(["CONTRACT", "PERMANENT"], {
      message: "Contract type is required",
    }),
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
    contractEmploymentType: z.enum(["FULL_TIME", "PART_TIME"], {
      message: "Employment type is required",
    }),
    hoursPerWeek: z
      .number()
      .gte(1, { message: "Must be at least 1 hour" })
      .lte(38, { message: "Cannot exceed 38 hours" }),
  })
  // super refine is deprecated but can be used for a more custom application
  .superRefine((data, ctx) => {
    // 1) Permanent -> no finishDate
    if (data.contractType === "PERMANENT" && data.finishDate) {
      ctx.addIssue({
        code: "custom",
        path: ["finishDate"],
        message: "Permanent contracts must not have a finish date",
      });
    }

    // 2) Contract -> finishDate required
    if (data.contractType === "CONTRACT" && !data.finishDate) {
      ctx.addIssue({
        code: "custom",
        path: ["finishDate"],
        message: "Contract type requires a finish date",
      });
    }

    // 3) If there is a finishDate, it must be after startDate
    if (data.finishDate) {
      const start = new Date(data.startDate);
      const finish = new Date(data.finishDate);
      if (finish <= start) {
        ctx.addIssue({
          code: "custom",
          path: ["finishDate"],
          message: "Finish date must be after start date",
        });
      }
    }

    // 4) Full-time -> exactly 38 hours
    if (data.contractEmploymentType === "FULL_TIME" && data.hoursPerWeek !== 38) {
      ctx.addIssue({
        code: "custom",
        path: ["hoursPerWeek"],
        message: "Full-time contracts must be 38 hours/week",
      });
    }

    // 5) Part-time -> less than 38 hours
    if (data.contractEmploymentType === "PART_TIME" && data.hoursPerWeek >= 38) {
      ctx.addIssue({
        code: "custom",
        path: ["hoursPerWeek"],
        message: "Part-time contracts must be fewer than 38 hours/week",
      });
    }
  });
