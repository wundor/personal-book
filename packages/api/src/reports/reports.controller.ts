import { Controller, Get, Post, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('net-worth')
  createNetWorth() {
    return this.reportsService.createNetWorth();
  }

  @Get('net-worth')
  getNetWorth() {
    return this.reportsService.getNetWorth();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }
}
