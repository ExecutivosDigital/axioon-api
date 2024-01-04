import { FacebookPostCommentsCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { FacebookPostCommentsRepository } from "../FacebookPostCommentsRepository";

interface CreateCommentProps extends FacebookPostCommentsCreateInterface {
	politician_id: string;
}

export class PrismaFacebookCommentsRepository
	implements FacebookPostCommentsRepository
{
	async createMany(data: FacebookPostCommentsCreateInterface[]) {
		const postId = data.map((item) => item.post_id);
		const idExists = data.map((item) => item.id);

		const [postExists, commentExists] = await Promise.all([
			prisma.facebookPostBaseData.findMany({
				where: {
					id: {
						in: postId,
					},
				},
			}),
			prisma.facebookPostComments.findMany({
				where: {
					id: {
						in: idExists,
					},
				},
			}),
		]);

		const createData: CreateCommentProps[] = [];
		const updateData: FacebookPostCommentsCreateInterface[] = [];

		data.forEach((item) => {
			if (!commentExists.find((comment) => comment.id === item.id)) {
				const post = postExists.find((post) => post.id === item.post_id);
				if (post && item.text) {
					createData.push({
						...item,
						politician_id: post.politician_id,
					});
				} else {
				}
			} else {
				updateData.push(item);
			}
		});

		await prisma.$transaction([
			prisma.facebookPostComments.createMany({ data: createData }),
			...updateData.map((update) =>
				prisma.facebookPostComments.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);

		return;
	}
}
