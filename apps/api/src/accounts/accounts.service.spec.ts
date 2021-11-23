import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from './accounts.service';
import { Accounts } from './entities/accounts.entity';

const accountArray = [new Accounts('Assets')];
const testAccount = 'Test Account 1';
const accountOne = new Accounts(testAccount);

describe('AccountsService', () => {
  let service: AccountsService;
  let repo: Repository<Accounts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Accounts),
          useValue: {
            create: jest.fn().mockReturnValue(accountOne),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(accountArray),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    repo = module.get<Repository<Accounts>>(getRepositoryToken(Accounts));
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
