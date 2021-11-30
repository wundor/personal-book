import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  create(@Body() transaction: CreateTransactionDto) {
    return this.service.create(transaction);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // @Get(':id)
  // findOne(@Param('id') id: string) {
  //   return this.service.findOne(id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() transaction: UpdateTransactionDto) {
  // //   return this.service.update(id, transaction);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.service.remove(id);
  // }
}
