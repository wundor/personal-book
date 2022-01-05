import { Injectable } from '@nestjs/common';
import { SearchBudgetDto } from './dto/search-budget.dto';

@Injectable()
export class BudgetsService {
  findOne(search: SearchBudgetDto) {
    // get expenses and liabilities
    // get transactions for a given period
    return `This action returns a #${search} budget`;
  }

  // update(id: number, updateBudgetDto: UpdateBudgetDto) {
  //   return `This action updates a #${id} budget`;
  // }
}
