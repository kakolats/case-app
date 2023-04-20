import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaginationService } from '@casejs/nest-library'

import { LangueController } from './langue.controller'
import { LangueService } from './langue.service'
import { Langue } from './langue.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Langue])],
  controllers: [LangueController],
  providers: [LangueService, PaginationService],
})
export class LangueModule {}
