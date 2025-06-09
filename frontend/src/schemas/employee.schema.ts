import { z } from "zod";

export const roleOptions = [
  "ACCOUNT_MANAGER",
  "ASSOCIATE_PRODUCT_MANAGER",
  "BACKEND_DEVELOPER",
  "CUSTOMER_SUCCESS_SPECIALIST",
  "DEVOPS_ENGINEER",
  "FRONTEND_DEVELOPER",
  "FULL_STACK_DEVELOPER",
  "HR_MANAGER",
  "MANUAL_TESTER",
  "OFFICE_ADMINISTRATOR",
  "PRODUCT_MANAGER",
  "PRODUCT_OWNER",
  "QA_ENGINEER",
  "RECRUITER",
  "SALES_EXECUTIVE",
  "SENIOR_SOFTWARE_ENGINEER",
  "SITE_RELIABILITY_ENGINEER",
  "SOFTWARE_ENGINEER",
  "SYSTEMS_ADMINISTRATOR",
  "TECH_LEAD",
  "TECH_SUPPORT_ENGINEER",
  "TEST_AUTOMATION_ENGINEER",
  "UI_DESIGNER",
  "UX_DESIGNER",
  "UX_RESEARCHER",
] as const;

export const employeeSchema = z.object({
  givenName: z.string().min(1, "Required"),
  surname: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
  address: z.string().min(1, "Required"),
  role: z.enum(roleOptions, { required_error: "Role is required" }),
});
