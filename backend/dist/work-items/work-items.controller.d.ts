import { WorkItemsService } from './work-items.service';
export declare class WorkItemsController {
    private readonly workItemsService;
    constructor(workItemsService: WorkItemsService);
    create(body: {
        title: string;
        description: string;
    }, req: any): Promise<{
        title: string;
        description: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findAll(req: any): Promise<{
        title: string;
        description: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }[]>;
    delete(id: string, req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    updateStatus(id: string, body: {
        status: string;
    }, req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
