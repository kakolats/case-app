import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaginationService } from '@casejs/nest-library'

import { PostulantController } from './postulant.controller'
import { PostulantService } from './postulant.service'
import { Postulant } from './postulant.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Postulant])],
  controllers: [PostulantController],
  providers: [PostulantService, PaginationService],
})
export class PostulantModule {}
