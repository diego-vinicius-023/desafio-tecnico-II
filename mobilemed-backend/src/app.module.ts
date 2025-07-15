import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesController } from './pacientes/pacientes.controller';
import { PacientesService } from './pacientes/pacientes.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { DataSource } from 'typeorm';
import { ExamesModule } from './exames/exames.module';
import { ExamesController } from './exames/exames.controller';
import { ExamesService } from './exames/exames.service';

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
    }),
    PacientesModule,
    ExamesModule
  ],
  controllers: [PacientesController, ExamesController],
  providers: [PacientesService, ExamesService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
