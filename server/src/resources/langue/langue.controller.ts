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

import { LangueService } from './langue.service'
import { Langue } from './langue.entity'
import { CreateUpdateLangueDto } from './dtos/create-update-langue.dto'

@Controller('langues')
export class LangueController {
  constructor(private readonly langueService: LangueService) {}

  @Get()
  @Permission('browseLangues')
  async index(
    @Query('langueIds') langueIds?: string[],
    @Query('page') page?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc', ParseBoolPipe) orderByDesc?: boolean,
    @Query('withoutPagination', ParseBoolPipe) withoutPagination?: boolean,
    @Query('toXLS', ParseBoolPipe) toXLS?: boolean
  ): Promise<Paginator<Langue> | Langue[] | string> {
    return this.langueService.index({
      langueIds,
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
    const langues: Langue[] = (await this.langueService.index({
      withoutPagination: true,
      orderBy,
      orderByDesc
    })) as Langue[]

    return langues.map((langue: Langue) => ({
      label: langue.libelle,
      value: langue.id
    }))
  }

  @Get('/:id')
  @Permission('readLangues')
  async show(@Param('id', ParseIntPipe) id: number): Promise<Langue> {
    return this.langueService.show(id)
  }
  
  @Post()
  @Permission('addLangues')
  async store(
    @Body() langueDto: CreateUpdateLangueDto
  ): Promise<Langue> {
    return await this.langueService.store(langueDto)
  }

  @Put('/:id')
  @Permission('editLangues')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() langueDto: CreateUpdateLangueDto
  ): Promise<UpdateResult> {
    return await this.langueService.update(id, langueDto)
  }

  @Delete('/:id')
  @Permission('deleteLangues')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.langueService.destroy(id)
  }
}
