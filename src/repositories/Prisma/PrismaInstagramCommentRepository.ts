import { prisma } from "@/lib/prisma";
import { InstagramPostCommentRepository } from "../InstagramPostCommentRepository";

export class PrismaInstagramCommentRepository
  implements InstagramPostCommentRepository
{
  async createMany(
    data: {
      id: string;
      text: string;
      ownerProfilePicUrl: string;
      post_id: string;
      ownerUsername: string;
      timestamp: string;
      likeCount: number;
    }[]
  ) {
    const idExists = data.map((item) => item.id);
    const postId = data.map((item) => item.post_id);

    const [postExists, commentExists] = await Promise.all([
      prisma.instagramPost.findMany({
        where: {
          id: {
            in: postId,
          },
        },
      }),
      prisma.instagramPostComment.findMany({
        where: {
          id: {
            in: idExists,
          },
        },
      }),
    ]);

    const createData: any = [];
    const updateData: any = [];

    data.forEach((item) => {
      if (!commentExists.find((comment) => comment.id === item.id)) {
        const post = postExists.find((post) => post.id === item.post_id);
        if (post && item.text) {
          createData.push({
            ...item,
            sentimentAnalysis: Math.floor(Math.random() * (100 - 1000) + 100),
            politician_id: post.politician_id,
          });
        } else {
        }
      } else {
        updateData.push(item);
      }
    });

    await prisma.$transaction([
      prisma.instagramPostComment.createMany({ data: createData }),
      ...updateData.map((update: any) =>
        prisma.instagramPostComment.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
    return;
  }
}
