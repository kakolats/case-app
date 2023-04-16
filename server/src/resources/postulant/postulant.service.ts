import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm'

import { Paginator, PaginationService, ExcelService } from '@casejs/nest-library'
import { Postulant } from './postulant.entity'
import { CreateUpdatePostulantDto } from './dtos/create-update-postulant.dto'

@Injectable()
export class PostulantService {
constructor(
    @InjectRepository(Postulant)
    private readonly repository: Repository<Postulant>,
    private paginationService: PaginationService,
    private excelService: ExcelService
  ) {}

  async index({
    postulantIds,
    page,
    orderBy,
    orderByDesc,
    toXLS,
    withoutPagination
  }: {
    postulantIds?: string[]
    page?: string
    orderBy?: string
    orderByDesc?: boolean
    toXLS?: boolean
    withoutPagination?: boolean
  }): Promise<Paginator<Postulant> | Postulant[] | string> {
    const query = this.repository
      .createQueryBuilder('postulant')

    if (postulantIds) {
      query.andWhere('postulant.id IN (:postulantIds)', { postulantIds })
    }
 
    if (orderBy) {
      query.orderBy(
        orderBy.includes('.') ? orderBy : 'postulant.' + orderBy,
        orderByDesc ? 'DESC' : 'ASC'
      )
    }

    if (toXLS) {
      return this.export(query)
    }

    if (withoutPagination) {
      return await query.getMany()
    }

    return await this.paginationService.paginate({
      query,
      currentPage: page ? parseInt(page, 10) : 1
    })
  }

  async export(query: SelectQueryBuilder<Postulant>): Promise<string> {
    const postulants = await query.getMany()
    return this.excelService.export(
      ['Id'],
      postulants.map((postulant: Postulant) => [postulant.id]),
      'postulants'
    )
  }

  async show(id: number): Promise<Postulant> {
    const postulant = await this.repository.findOneOrFail({ where: { id } })

    return postulant
  }

  async store(postulantDto: CreateUpdatePostulantDto): Promise<Postulant> {
    const postulant: Postulant = this.repository.create(postulantDto)
    return await this.repository.save(postulant)
  }

  async update(
    id: number,
    postulantDto: CreateUpdatePostulantDto
  ): Promise<UpdateResult> {
    const postulant: Postulant = this.repository.create(postulantDto)

    return await this.repository.update(id, postulant)
  }

  async destroy(id: number): Promise<DeleteResult> {
    const postulant: Postulant = await this.repository.findOneOrFail({ where: { id } })

    return await this.repository.delete(postulant.id)
  }
}
