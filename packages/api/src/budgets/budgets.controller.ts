import { Controller, Get, Query } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { SearchBudgetDto } from './dto/search-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  findOne(@Query() search: SearchBudgetDto) {
    return this.budgetsService.findOne(search);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
  //   return this.budgetsService.update(+id, updateBudgetDto);
  // }
}
