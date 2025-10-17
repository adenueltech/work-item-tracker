import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WorkItemsService {
  private prisma = new PrismaClient();

  async create(title: string, description: string, userId: number) {
    return this.prisma.workItem.create({
      data: { title, description, status: "todo", userId },
    });
  }

  async findAll(userId: number) {
    return this.prisma.workItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: number, userId: number) {
    return this.prisma.workItem.deleteMany({
      where: { id, userId },
    });
  }

  async updateStatus(id: number, status: string, userId: number) {
    return this.prisma.workItem.updateMany({
      where: { id, userId },
      data: { status },
    });
  }
}
