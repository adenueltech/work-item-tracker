export declare class WorkItemsService {
    private prisma;
    create(title: string, description: string, userId: number): Promise<{
        title: string;
        description: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findAll(userId: number): Promise<{
        title: string;
        description: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }[]>;
    delete(id: number, userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    updateStatus(id: number, status: string, userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
