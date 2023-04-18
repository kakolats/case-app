import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaginationService } from '@casejs/nest-library'

import { CompetenceController } from './competence.controller'
import { CompetenceService } from './competence.service'
import { Competence } from './competence.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Competence])],
  controllers: [CompetenceController],
  providers: [CompetenceService, PaginationService],
})
export class CompetenceModule {}
