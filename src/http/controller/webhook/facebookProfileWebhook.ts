import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookProfileWebhook } from "@/useCase/@factories/webhook/makeFacebookProfileWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookProfileWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	const facebookWebhookUseCase = makeFacebookProfileWebhook();
	const data = await facebookWebhookUseCase.execute({
		records,
	});

	return reply.status(200).send(data);
};
