import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, Patch } from '@nestjs/common';
import { WorkItemsService } from './work-items.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('work-items')
@UseGuards(JwtAuthGuard)
export class WorkItemsController {
  constructor(private readonly workItemsService: WorkItemsService) {}

  @Post()
  async create(@Body() body: { title: string; description: string }, @Request() req) {
    return this.workItemsService.create(body.title, body.description, req.user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    return this.workItemsService.findAll(req.user.userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.workItemsService.delete(parseInt(id), req.user.userId);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }, @Request() req) {
    return this.workItemsService.updateStatus(parseInt(id), body.status, req.user.userId);
  }
}
