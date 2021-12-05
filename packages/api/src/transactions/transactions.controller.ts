import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SearchTransactionDto } from './dto/search-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  create(@Body() transaction: CreateTransactionDto) {
    return this.service.create(transaction);
  }

  @Get()
  findAll(@Query() query: SearchTransactionDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() transaction: UpdateTransactionDto,
  ) {
    return this.service.update(id, transaction);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.service.remove(id);
  // }
}
