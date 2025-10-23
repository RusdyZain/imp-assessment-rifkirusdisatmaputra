import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const postService = {
  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        include: { author: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count(),
    ]);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  },

  async create(data: { title: string; content: string; authorId: number }) {
    return prisma.post.create({ data });
  },

  async update(id: number, data: any) {
    return prisma.post.update({ where: { id }, data });
  },

  async remove(id: number) {
    return prisma.post.delete({ where: { id } });
  },
};
