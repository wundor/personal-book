import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

// Source of inspiration: https://github.com/jmcdo29/testing-nestjs/blob/master/apps/typeorm-sample/src/cat/cat.service.spec.ts

const allAccounts = [
  {
    id: 1,
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
    name: 'META:Starting-Balance',
  },
  {
    id: 2,
    createdAt: '2021-11-27T18:47:37.000Z',
    updatedAt: '2021-11-27T18:47:37.000Z',
    name: 'mega boss',
  },
];

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: {
            findOne: jest.fn().mockResolvedValue('kek pek account'),
            findAll: jest.fn().mockResolvedValue(allAccounts),
            persist: jest.fn(),
            flush: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of cats', async () => {
      const accounts = await service.findAll();
      expect(accounts).toEqual(allAccounts);
    });
  });
});
