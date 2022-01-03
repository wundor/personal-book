import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { JournalLine } from './entities/journal_line.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Account } from '../accounts/entities/account.entity';

// Source of inspiration: https://github.com/jmcdo29/testing-nestjs/blob/master/apps/typeorm-sample/src/cat/cat.service.spec.ts

const allTransactions = [
  new Transaction(new Date(), 'Test'),
  new Transaction(new Date('1995-12-17T03:24:00'), 'Test2'),
];

const lessTransactions = [new Transaction(new Date(), 'Test3')];

const oneTransaction = new Transaction(new Date(), 'Test4');

const newTransaction: CreateTransactionDto = {
  date: new Date(),
  info: 'Test5',
  lines: [
    {
      account: new Account('Account1'),
      amount: 100,
    },
    {
      account: new Account('Account2'),
      amount: -100,
    },
  ],
};

describe('AccountsService', () => {
  let service: TransactionsService;
  let repo: EntityRepository<Transaction>;
  let lineRepo: EntityRepository<JournalLine>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: AccountsService,
          useValue: {
            findByName: jest.fn().mockResolvedValue(new Account('Mock')),
          },
        },
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(oneTransaction),
            findAll: jest.fn().mockResolvedValue(allTransactions),
            find: jest.fn().mockResolvedValue(lessTransactions),
            persist: jest.fn().mockResolvedValue(true),
            flush: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: getRepositoryToken(JournalLine),
          useValue: {
            findOne: jest.fn().mockResolvedValue(true),
            findOneOrFail: jest.fn().mockResolvedValue(true),
            findAll: jest.fn().mockResolvedValue(true),
            persist: jest.fn().mockResolvedValue(true),
            flush: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repo = module.get<EntityRepository<Transaction>>(
      getRepositoryToken(Transaction),
    );
    lineRepo = module.get<EntityRepository<JournalLine>>(
      getRepositoryToken(JournalLine),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of transactions', async () => {
      const findSpy = jest.spyOn(repo, 'findAll');
      const result = await service.findAll();
      expect(findSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledWith(['lines', 'lines.account']);
      expect(result).toHaveLength(2);
      expect(result).toEqual(allTransactions);
    });

    xit('should return less transactions for a month', async () => {
      const findSpy = jest.spyOn(repo, 'find');
      const result = await service.findAll();
      expect(findSpy).toBeCalledTimes(1);
      const date = new Date();
      expect(findSpy).toBeCalledWith(
        {
          date: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1),
            $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
          },
        },
        ['lines', 'lines.account'],
      );
      expect(result).toHaveLength(1);
      expect(result).toEqual(lessTransactions);
    });
  });

  describe('findOne', () => {
    it('should return one transaction', async () => {
      const findSpy = jest.spyOn(repo, 'findOneOrFail');
      const result = await service.findOne(oneTransaction.id);
      expect(findSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledWith(oneTransaction.id, [
        'lines',
        'lines.account',
      ]);
      expect(result).toEqual(oneTransaction);
    });
  });

  xdescribe('create', () => {
    it('should create one transaction', async () => {
      const tFlushSpy = jest.spyOn(repo, 'flush');
      const tPersistSpy = jest.spyOn(repo, 'persist');
      const result = await service.create(newTransaction);
      expect(tFlushSpy).toBeCalledTimes(1);
      expect(tPersistSpy).toBeCalledTimes(1);
      expect(tFlushSpy).toBeCalledWith(oneTransaction.id, [
        'lines',
        'lines.account',
      ]);
      expect(result).toEqual(newTransaction);
    });
  });
});
