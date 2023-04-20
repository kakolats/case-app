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

import { NiveauService } from './niveau.service'
import { Niveau } from './niveau.entity'
import { CreateUpdateNiveauDto } from './dtos/create-update-niveau.dto'

@Controller('niveaus')
export class NiveauController {
  constructor(private readonly niveauService: NiveauService) {}

  @Get()
  @Permission('browseNiveaus')
  async index(
    @Query('niveauIds') niveauIds?: string[],
    @Query('page') page?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc', ParseBoolPipe) orderByDesc?: boolean,
    @Query('withoutPagination', ParseBoolPipe) withoutPagination?: boolean,
    @Query('toXLS', ParseBoolPipe) toXLS?: boolean
  ): Promise<Paginator<Niveau> | Niveau[] | string> {
    return this.niveauService.index({
      niveauIds,
      page,
      orderBy,
      orderByDesc,
      withoutPagination,
      toXLS
    })
  }

  @Get('select-options')
  async listSelectOptions(
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc', ParseBoolPipe) orderByDesc?: boolean
  ): Promise<SelectOption[]> {
    const niveaus: Niveau[] = (await this.niveauService.index({
      withoutPagination: true,
      orderBy,
      orderByDesc
    })) as Niveau[]

    return niveaus.map((niveau: Niveau) => ({
      label: niveau.libelle,
      value: niveau.id
    }))
  }

  @Get('/:id')
  @Permission('readNiveaus')
  async show(@Param('id', ParseIntPipe) id: number): Promise<Niveau> {
    return this.niveauService.show(id)
  }
  
  @Post()
  @Permission('addNiveaus')
  async store(
    @Body() niveauDto: CreateUpdateNiveauDto
  ): Promise<Niveau> {
    return await this.niveauService.store(niveauDto)
  }

  @Put('/:id')
  @Permission('editNiveaus')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() niveauDto: CreateUpdateNiveauDto
  ): Promise<UpdateResult> {
    return await this.niveauService.update(id, niveauDto)
  }

  @Delete('/:id')
  @Permission('deleteNiveaus')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.niveauService.destroy(id)
  }
}
