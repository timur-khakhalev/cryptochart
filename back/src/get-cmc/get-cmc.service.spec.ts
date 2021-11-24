import { Test, TestingModule } from '@nestjs/testing';
import { GetCmcService } from './get-cmc.service';

describe('GetCmcService', () => {
  let service: GetCmcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCmcService],
    }).compile();

    service = module.get<GetCmcService>(GetCmcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
