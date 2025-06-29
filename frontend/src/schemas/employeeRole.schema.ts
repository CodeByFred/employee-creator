import { z } from "zod/v4";

export const employeeRoleSchema = z.object({
  roleId: z
    .number()
    .gte(1, "You have selected a role that does not exist")
    .lte(25, "You have selected a role that does not exist"),
  priorYearsOfExperience: z.number().gte(0, "Cannot have less than 0 years experience"),
  promotionType: z.enum(
    ["NONE", "PROMOTION", "LATERAL", "DEMOTION"],
    "Promotion type is required"
  ),
  performanceRating: z
    .number()
    .gte(1, "Minimum rating of 1 required")
    .lte(5, "Maximum rating cannot exceed 5"),
});
