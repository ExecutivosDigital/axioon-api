import { z } from "zod";

export const ZodIdParamsSchema = z.object({
	id: z.string(),
});

export const ZodWebhookBodySchema = z.object({
	records: z.string(),
});
