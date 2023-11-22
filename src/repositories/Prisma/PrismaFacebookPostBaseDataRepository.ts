import { prisma } from "@/lib/prisma";
import { FacebookPostBaseDataRepository } from "../FacebookPostBaseDataRepository";

export class PrismaFacebookPostBaseDataRepository
  implements FacebookPostBaseDataRepository
{
  async createMany(
    data: {
      id: string;
      text: string;
      url: string;
      date: string;
      likes: string;
      shares: string;
      comments: string;
      thumbnail: string;
      politician_id: string;
    }[]
  ): Promise<any> {
    const idExists = data.map((item) => item.id);

    const postExists = await prisma.facebookPostBaseData.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createPostData: any = [];
    const updatePostData: any = [];

    data.forEach((item) => {
      if (!postExists.find((video) => video.id === item.id)) {
        createPostData.push(item);
      } else {
        updatePostData.push(item);
      }
    });

    await prisma.$transaction([
      prisma.facebookPostBaseData.createMany({ data: createPostData }),
      ...updatePostData.map((update: any) =>
        prisma.facebookPostBaseData.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);

    return;
  }

  async findDetails(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any> {
    return await prisma.facebookPostBaseData.findMany({
      where: {
        politician_id: data.id,
        date: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
    });
  }
}
