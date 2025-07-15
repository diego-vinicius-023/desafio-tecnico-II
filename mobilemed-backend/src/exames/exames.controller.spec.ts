import { Test, TestingModule } from '@nestjs/testing';
import { ExamesController } from './exames.controller';
import { ExamesService } from './exames.service';
import { DICOM } from 'src/entities/dicom.entity';

describe('ExamesController', () => {
  let controller: ExamesController;
  let service: ExamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamesController],
      providers: [
        {
          provide: ExamesService,
          useValue: {
            getExames: jest.fn(),
            postExame: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExamesController>(ExamesController);
    service = module.get<ExamesService>(ExamesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getExames', () => {
    it('should call service.getExames with correct params', async () => {
      const result = [{ id: 1 }];
      jest.spyOn(service, 'getExames').mockResolvedValue(result as any);

      const idPaciente = 'abc';
      const page = 1;
      const pageSize = 10;

      expect(
        await controller.getExames(idPaciente, page, pageSize),
      ).toBe(result);
      expect(service.getExames).toHaveBeenCalledWith(idPaciente, page, pageSize);
    });
  });

  describe('postExames', () => {
    it('should call service.postExame with correct params', async () => {
      const idPaciente = 'abc';
      const body = {
        nomeExame: 'Exame 1',
        dataExame: new Date(),
        dicom: {} as DICOM,
      };
      const result = { success: true };
      jest.spyOn(service, 'postExame').mockResolvedValue(result as any);

      expect(
        await controller.postExames(idPaciente, body),
      ).toBe(result);
      expect(service.postExame).toHaveBeenCalledWith(
        idPaciente,
        body.nomeExame,
        body.dataExame,
        body.dicom,
      );
    });
  });
});
