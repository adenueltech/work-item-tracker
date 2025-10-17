"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkItemsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let WorkItemsService = class WorkItemsService {
    prisma = new client_1.PrismaClient();
    async create(title, description, userId) {
        return this.prisma.workItem.create({
            data: { title, description, status: "todo", userId },
        });
    }
    async findAll(userId) {
        return this.prisma.workItem.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async delete(id, userId) {
        return this.prisma.workItem.deleteMany({
            where: { id, userId },
        });
    }
    async updateStatus(id, status, userId) {
        return this.prisma.workItem.updateMany({
            where: { id, userId },
            data: { status },
        });
    }
};
exports.WorkItemsService = WorkItemsService;
exports.WorkItemsService = WorkItemsService = __decorate([
    (0, common_1.Injectable)()
], WorkItemsService);
//# sourceMappingURL=work-items.service.js.map