"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkItemsController = void 0;
const common_1 = require("@nestjs/common");
const work_items_service_1 = require("./work-items.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let WorkItemsController = class WorkItemsController {
    workItemsService;
    constructor(workItemsService) {
        this.workItemsService = workItemsService;
    }
    async create(body, req) {
        return this.workItemsService.create(body.title, body.description, req.user.userId);
    }
    async findAll(req) {
        return this.workItemsService.findAll(req.user.userId);
    }
    async delete(id, req) {
        return this.workItemsService.delete(parseInt(id), req.user.userId);
    }
    async updateStatus(id, body, req) {
        return this.workItemsService.updateStatus(parseInt(id), body.status, req.user.userId);
    }
};
exports.WorkItemsController = WorkItemsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkItemsController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], WorkItemsController.prototype, "updateStatus", null);
exports.WorkItemsController = WorkItemsController = __decorate([
    (0, common_1.Controller)('work-items'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [work_items_service_1.WorkItemsService])
], WorkItemsController);
//# sourceMappingURL=work-items.controller.js.map