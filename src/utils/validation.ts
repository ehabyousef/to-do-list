import { z } from "zod";

export const CrateTaskValidation = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be string",
    })
    .min(2, "min is 2 letter")
    .max(200, "max is 200 letter"),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be string",
    })
    .min(10, "min is 5 letter"),
});
