import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

// Source of inspiration: https://github.com/jmcdo29/testing-nestjs/blob/master/apps/typeorm-sample/src/cat/cat.service.spec.ts

const allAccounts = [new Account('Test'), new Account('Test2')];
const oneAccount = new Account('Test');

describe('AccountsService', () => {
  let service: AccountsService;
  let repo: EntityRepository<Account>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: {
            findAll: jest.fn().mockResolvedValue(allAccounts),
            findOneOrFail: jest.fn().mockResolvedValue(oneAccount),
            persistAndFlush: jest.fn().mockResolvedValue(true),
            flush: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    repo = module.get<EntityRepository<Account>>(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of accounts', async () => {
      const findSpy = jest.spyOn(repo, 'findAll');
      const result = await service.findAll();
      expect(findSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledWith();
      expect(result).toHaveLength(2);
      expect(result).toEqual(allAccounts);
    });
  });

  describe('findOne', () => {
    it('Should return one account', async () => {
      const findSpy = jest.spyOn(repo, 'findOneOrFail');
      const result = await service.findOne(oneAccount.id);
      expect(result).toEqual(result);
      expect(findSpy).toBeCalledWith({ id: result.id }, [
        'lines',
        'lines.transaction',
      ]);
    });

    it('Should compute the balance', async () => {
      const result = await service.findOne(oneAccount.id);
      expect(result).toHaveProperty('balance');
      expect(result.balance).toEqual(0);
    });
  });

  describe('findByName', () => {
    it('Should return one account', async () => {
      const findSpy = jest.spyOn(repo, 'findOneOrFail');
      const result = await service.findByName(oneAccount.fullName);
      expect(result).toEqual(oneAccount);
      expect(findSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledWith({ fullName: 'Test' }, [
        'lines',
        'lines.transaction',
      ]);
    });

    it('Should compute the balance', async () => {
      const result = await service.findByName(oneAccount.fullName);
      expect(result).toHaveProperty('balance');
      expect(result.balance).toEqual(0);
    });
  });

  describe('create', () => {
    it('Should create one account', async () => {
      const flushSpy = jest.spyOn(repo, 'persistAndFlush');
      const findSpy = jest.spyOn(repo, 'findOneOrFail');
      const result = await service.create({
        fullName: 'Test',
      });
      expect(result).toEqual(oneAccount);
      expect(flushSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledWith({ fullName: 'Test' }, [
        'lines',
        'lines.transaction',
      ]);
    });
  });

  describe('update', () => {
    it('Should update account', async () => {
      const findSpy = jest.spyOn(repo, 'findOneOrFail');
      const flushSpy = jest.spyOn(repo, 'flush');
      const result = await service.update(oneAccount.id, {
        fullName: 'Test2',
        id: oneAccount.id,
      });
      expect(result).toEqual(oneAccount);
      expect(result.fullName).toEqual('Test2');
      expect(flushSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledTimes(2);
      expect(findSpy).toBeCalledWith({ id: oneAccount.id }, [
        'lines',
        'lines.transaction',
      ]);
    });
  });
});
