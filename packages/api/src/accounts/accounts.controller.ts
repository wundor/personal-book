import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SearchAccountDto } from './dto/search-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get('search')
  findOneByName(@Query() query: SearchAccountDto) {
    return this.accountsService.findByName(query.name);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, updateAccountDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountsService.remove(id);
  // }
}
