import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm'

import { Paginator, PaginationService, ExcelService } from '@casejs/nest-library'
import { Competence } from './competence.entity'
import { CreateUpdateCompetenceDto } from './dtos/create-update-competence.dto'

@Injectable()
export class CompetenceService {
constructor(
    @InjectRepository(Competence)
    private readonly repository: Repository<Competence>,
    private paginationService: PaginationService,
    private excelService: ExcelService
  ) {}

  async index({
    competenceIds,
    page,
    orderBy,
    orderByDesc,
    toXLS,
    withoutPagination,
  }: {
    competenceIds?: string[]
    page?: string
    orderBy?: string
    orderByDesc?: boolean
    toXLS?: boolean
    withoutPagination?: boolean
  }): Promise<Paginator<Competence> | Competence[] | string> {
    const query = this.repository
      .createQueryBuilder('competence')

    if (competenceIds) {
      query.andWhere('competence.id IN (:competenceIds)', { competenceIds })
    }
 
    if (orderBy) {
      query.orderBy(
        orderBy.includes('.') ? orderBy : 'competence.' + orderBy,
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

  async export(query: SelectQueryBuilder<Competence>): Promise<string> {
    const competences = await query.getMany()
    return this.excelService.export(
      ['Id'],
      competences.map((competence: Competence) => [competence.id]),
      'competences'
    )
  }

  async show(id: number): Promise<Competence> {
    const competence = await this.repository.findOneOrFail({ where: { id } })

    return competence
  }

  async store(competenceDto: CreateUpdateCompetenceDto): Promise<Competence> {
    const competence: Competence = this.repository.create(competenceDto)
    
    return await this.repository.save(competence)
  }

  async update(
    id: number,
    competenceDto: CreateUpdateCompetenceDto
  ): Promise<UpdateResult> {
    const competence: Competence = this.repository.create(competenceDto)

    return await this.repository.update(id, competence)
  }

  async destroy(id: number): Promise<DeleteResult> {
    const competence: Competence = await this.repository.findOneOrFail({ where: { id } })

    return await this.repository.delete(competence.id)
  }
}
