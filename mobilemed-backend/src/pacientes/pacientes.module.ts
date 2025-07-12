import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'mobilemed_db',
      port: 5432,
      database: 'postgres',
      entities: [],
      username: 'postgres',
      password: 'senhatemp',
      synchronize: true
    })
  ],
  controllers: [PacientesController],
  providers: [PacientesService],
})
export class PacientesModule {}
