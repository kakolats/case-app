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

import { PostulantService } from './postulant.service'
import { Postulant } from './postulant.entity'
import { CreateUpdatePostulantDto } from './dtos/create-update-postulant.dto'

@Controller('postulants')
export class PostulantController {
  constructor(private readonly postulantService: PostulantService) {}

  @Get()
  @Permission('browsePostulants')
  async index(
    @Query('postulantIds') postulantIds?: string[],
    @Query('competenceId') competenceId?: string,
    @Query('page') page?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc', ParseBoolPipe) orderByDesc?: boolean,
    @Query('withoutPagination', ParseBoolPipe) withoutPagination?: boolean,
    @Query('toXLS', ParseBoolPipe) toXLS?: boolean,
    @Query('niveauId') niveauId?:string,
    @Query('langueId') langueId?:string,
  ): Promise<Paginator<Postulant> | Postulant[] | string> {
    return this.postulantService.index({
      postulantIds,
      page,
      orderBy,
      orderByDesc,
      withoutPagination,
      toXLS,
      niveauId,
      langueId,
      competenceId
    })
  }

  @Get('select-options')
  @UseGuards(AuthGuard)
  async listSelectOptions(
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc', ParseBoolPipe) orderByDesc?: boolean
  ): Promise<SelectOption[]> {
    const postulants: Postulant[] = (await this.postulantService.index({
      withoutPagination: true,
      orderBy,
      orderByDesc,
    })) as Postulant[]

    return postulants.map((postulant: Postulant) => ({
      label: `postulant ${postulant.id}`,
      value: postulant.id
    }))
  }

  @Get('/:id')
  @Permission('readPostulants')
  async show(@Param('id', ParseIntPipe) id: number): Promise<Postulant> {
    return this.postulantService.show(id)
  }
  
  @Post()
  @Permission('addPostulants')
  async store(
    @Body() postulantDto: CreateUpdatePostulantDto
  ): Promise<Postulant> {
    const postulant:Postulant  = await this.postulantService.store(postulantDto)
    return postulant
  }

  @Put('/:id')
  @Permission('editPostulants')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() postulantDto: CreateUpdatePostulantDto
  ): Promise<UpdateResult> {
    return await this.postulantService.update(id, postulantDto)
  }

  @Delete('/:id')
  @Permission('deletePostulants')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.postulantService.destroy(id)
  }
}
