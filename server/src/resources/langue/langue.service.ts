import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm'

import { Paginator, PaginationService, ExcelService } from '@casejs/nest-library'
import { Langue } from './langue.entity'
import { CreateUpdateLangueDto } from './dtos/create-update-langue.dto'

@Injectable()
export class LangueService {
constructor(
    @InjectRepository(Langue)
    private readonly repository: Repository<Langue>,
    private paginationService: PaginationService,
    private excelService: ExcelService
  ) {}

  async index({
    langueIds,
    page,
    orderBy,
    orderByDesc,
    toXLS,
    withoutPagination
  }: {
    langueIds?: string[]
    page?: string
    orderBy?: string
    orderByDesc?: boolean
    toXLS?: boolean
    withoutPagination?: boolean
  }): Promise<Paginator<Langue> | Langue[] | string> {
    const query = this.repository
      .createQueryBuilder('langue')

    if (langueIds) {
      query.andWhere('langue.id IN (:langueIds)', { langueIds })
    }
 
    if (orderBy) {
      query.orderBy(
        orderBy.includes('.') ? orderBy : 'langue.' + orderBy,
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

  async export(query: SelectQueryBuilder<Langue>): Promise<string> {
    const langues = await query.getMany()
    return this.excelService.export(
      ['Id'],
      langues.map((langue: Langue) => [langue.id]),
      'langues'
    )
  }

  async show(id: number): Promise<Langue> {
    const langue = await this.repository.findOneOrFail({ where: { id } })

    return langue
  }

  async store(langueDto: CreateUpdateLangueDto): Promise<Langue> {
    const langue: Langue = this.repository.create(langueDto)
    return await this.repository.save(langue)
  }

  async update(
    id: number,
    langueDto: CreateUpdateLangueDto
  ): Promise<UpdateResult> {
    const langue: Langue = this.repository.create(langueDto)

    return await this.repository.update(id, langue)
  }

  async destroy(id: number): Promise<DeleteResult> {
    const langue: Langue = await this.repository.findOneOrFail({ where: { id } })

    return await this.repository.delete(langue.id)
  }
}
