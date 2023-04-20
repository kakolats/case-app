import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaginationService } from '@casejs/nest-library'

import { NiveauController } from './niveau.controller'
import { NiveauService } from './niveau.service'
import { Niveau } from './niveau.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Niveau])],
  controllers: [NiveauController],
  providers: [NiveauService, PaginationService],
})
export class NiveauModule {}
