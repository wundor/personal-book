import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

const accountArray = [new Account('Assets')];
const testAccount = 'Test Account 1';
const accountOne = new Account(testAccount);

describe('AccountsService', () => {
  let service: AccountsService;
  let repo: Repository<Account>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: {
            create: jest.fn().mockReturnValue(accountOne),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(accountArray),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    repo = module.get<Repository<Account>>(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get all', () => {
    it('should return an array of accounts', async () => {
      const cats = await service.findAll();
      expect(cats).toEqual(accountArray);
    });
  });

  describe('Create account', () => {
    it('should successfully create an account', () => {
      expect(
        service.create({
          name: testAccount,
        })
      ).resolves.toEqual(accountOne);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        name: testAccount,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });
});
