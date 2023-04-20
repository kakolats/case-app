import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm'

import { Paginator, PaginationService, ExcelService } from '@casejs/nest-library'
import { Niveau } from './niveau.entity'
import { CreateUpdateNiveauDto } from './dtos/create-update-niveau.dto'

@Injectable()
export class NiveauService {
constructor(
    @InjectRepository(Niveau)
    private readonly repository: Repository<Niveau>,
    private paginationService: PaginationService,
    private excelService: ExcelService
  ) {}

  async index({
    niveauIds,
    page,
    orderBy,
    orderByDesc,
    toXLS,
    withoutPagination
  }: {
    niveauIds?: string[]
    page?: string
    orderBy?: string
    orderByDesc?: boolean
    toXLS?: boolean
    withoutPagination?: boolean
  }): Promise<Paginator<Niveau> | Niveau[] | string> {
    const query = this.repository
      .createQueryBuilder('niveau')

    if (niveauIds) {
      query.andWhere('niveau.id IN (:niveauIds)', { niveauIds })
    }
 
    if (orderBy) {
      query.orderBy(
        orderBy.includes('.') ? orderBy : 'niveau.' + orderBy,
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

  async export(query: SelectQueryBuilder<Niveau>): Promise<string> {
    const niveaus = await query.getMany()
    return this.excelService.export(
      ['Id'],
      niveaus.map((niveau: Niveau) => [niveau.id]),
      'niveaus'
    )
  }

  async show(id: number): Promise<Niveau> {
    const niveau = await this.repository.findOneOrFail({ where: { id } })

    return niveau
  }

  async store(niveauDto: CreateUpdateNiveauDto): Promise<Niveau> {
    const niveau: Niveau = this.repository.create(niveauDto)
    return await this.repository.save(niveau)
  }

  async update(
    id: number,
    niveauDto: CreateUpdateNiveauDto
  ): Promise<UpdateResult> {
    const niveau: Niveau = this.repository.create(niveauDto)

    return await this.repository.update(id, niveau)
  }

  async destroy(id: number): Promise<DeleteResult> {
    const niveau: Niveau = await this.repository.findOneOrFail({ where: { id } })

    return await this.repository.delete(niveau.id)
  }
}
