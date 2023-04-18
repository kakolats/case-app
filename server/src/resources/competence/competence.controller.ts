import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { UpdateResult, DeleteResult } from 'typeorm'
import { Permission, Paginator, AuthGuard, SelectOption } from '@casejs/nest-library'

import { CompetenceService } from './competence.service'
import { Competence } from './competence.entity'
import { CreateUpdateCompetenceDto } from './dtos/create-update-competence.dto'

@Controller('competences')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  @Get()
  @Permission('browseCompetences')
  async index(
    @Query('competenceIds') competenceIds?: string[],
    @Query('page') page?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc', ParseBoolPipe) orderByDesc?: boolean,
    @Query('withoutPagination', ParseBoolPipe) withoutPagination?: boolean,
    @Query('toXLS', ParseBoolPipe) toXLS?: boolean
  ): Promise<Paginator<Competence> | Competence[] | string> {
    return this.competenceService.index({
      competenceIds,
      page,
      orderBy,
      orderByDesc,
      withoutPagination,
      toXLS
    })
  }

  @Get('select-options')
  @UseGuards(AuthGuard)
  async listSelectOptions(
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc', ParseBoolPipe) orderByDesc?: boolean
  ): Promise<SelectOption[]> {
    const competences: Competence[] = (await this.competenceService.index({
      withoutPagination: true,
      orderBy,
      orderByDesc
    })) as Competence[]

    return competences.map((competence: Competence) => ({
      label: `${competence.libelle}`,
      value: `${competence.libelle}`
    }))
  }

  @Get('/:id')
  @Permission('readCompetences')
  async show(@Param('id', ParseIntPipe) id: number): Promise<Competence> {
    return this.competenceService.show(id)
  }
  
  @Post()
  @Permission('addCompetences')
  async store(
    @Body() competenceDto: CreateUpdateCompetenceDto
  ): Promise<Competence> {
    return await this.competenceService.store(competenceDto)
  }

  @Put('/:id')
  @Permission('editCompetences')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() competenceDto: CreateUpdateCompetenceDto
  ): Promise<UpdateResult> {
    return await this.competenceService.update(id, competenceDto)
  }

  @Delete('/:id')
  @Permission('deleteCompetences')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.competenceService.destroy(id)
  }
}
