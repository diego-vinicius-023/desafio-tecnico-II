import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesController } from './pacientes/pacientes.controller';
import { PacientesService } from './pacientes/pacientes.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { DataSource } from 'typeorm';

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
    PacientesModule
  ],
  controllers: [AppController, PacientesController],
  providers: [AppService, PacientesService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
