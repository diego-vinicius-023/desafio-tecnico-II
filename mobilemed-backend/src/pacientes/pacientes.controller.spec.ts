import { Test, TestingModule } from '@nestjs/testing';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

describe('PacientesController', () => {
  let pacientesController: PacientesController;

  beforeEach(async () => {
    const pacientes: TestingModule = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [PacientesService],
    }).compile();

    pacientesController = pacientes.get<PacientesController>(PacientesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pacientesController.getHello()).toBe('Hello World!');
    });
  });
});
