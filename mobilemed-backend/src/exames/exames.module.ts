import { Module } from '@nestjs/common';
import { ExamesController } from './exames.controller';
import { ExamesService } from './exames.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exame } from 'src/entities/exame.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Exame])],
  exports: [TypeOrmModule],
  controllers: [ExamesController],
  providers: [ExamesService],
})
export class ExamesModule {}
