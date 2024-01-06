import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookAdsWebhook } from "@/useCase/@factories/webhook/makeFacebookAdsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookAdsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log(request.body);
	const { Records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const facebookAdsWebhookUseCase = makeFacebookAdsWebhook();

		await facebookAdsWebhookUseCase.execute({
			records: Records,
		});

		reply.status(200).send();
	} catch (error) {}
};
