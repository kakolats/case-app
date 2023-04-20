import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, EntityManager, Repository, SelectQueryBuilder, UpdateResult, getManager } from 'typeorm'

import { Paginator, PaginationService, ExcelService } from '@casejs/nest-library'
import { Postulant } from './postulant.entity'
import { CreateUpdatePostulantDto } from './dtos/create-update-postulant.dto'
import { CompetenceService } from 'resources/competence/competence.service'
import { Competence } from 'resources/competence/competence.entity'
import { Niveau } from 'resources/niveau/niveau.entity'
import { Langue } from 'resources/langue/langue.entity'

@Injectable()
export class PostulantService {
constructor(
    @InjectRepository(Postulant)
    private readonly repository: Repository<Postulant>,
    private paginationService: PaginationService,
    private excelService: ExcelService,
    private entityManager: EntityManager = getManager()
  ) {}

  async index({
    postulantIds,
    competenceId,
    page,
    orderBy,
    orderByDesc,
    toXLS,
    withoutPagination,
    niveauId,
    langueId
  }: {
    postulantIds?: string[],
    competenceId?:string
    page?: string
    orderBy?: string
    orderByDesc?: boolean
    toXLS?: boolean
    withoutPagination?: boolean
    niveauId?:string,
    langueId?:string
  }): Promise<Paginator<Postulant> | Postulant[] | string> {
    const query = this.repository
      .createQueryBuilder('postulant')
      .loadAllRelationIds()
      .leftJoinAndSelect('postulant.niveau','niveau')
      .leftJoinAndSelect('postulant.langue','langue')
      .leftJoinAndSelect('postulant.competences','competence')

    if (niveauId) {
      query.andWhere('niveau.id = :niveauId', {
        niveauId
      })
    }
    if (langueId) {
      query.andWhere('langue.id = :langueId', {
        langueId
      })
    } 
    if (postulantIds) {
      query.andWhere('postulant.id IN (:postulantIds)', { postulantIds })
    }
    //competenceIds = ['44','45']
    if(competenceId){
      //console.log(competences)
      query.andWhere(' competence.id = :competenceId', { competenceId })
      
      //query.andHaving(`COUNT(competences) = ${competenceIds.length}`)
    }
    if (orderBy) {
      query.orderBy(
        orderBy.includes('.') ? orderBy : 'postulant.' + orderBy,
        orderByDesc ? 'DESC' : 'ASC'
      )
    }
    //console.log(query)
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

  /* async competences(postulantDto:CreateUpdatePostulantDto):Promise<Competence[]>{
    let listComp:Competence[];
    postulantDto.competences.forEach(element => {
      let comp = this.competenceService.show(element.id)
    });
  } */

  async setCompetences(postulant:Postulant,postulantDto: CreateUpdatePostulantDto){
    /* postulantDto.competenceIds.forEach(async element => {
      let competenceId:number|any = +element
      postulant.competences.push( await this.entityManager.findOneOrFail(
        Competence,
        { where: competenceId }
      ))
    }); */
    // Initialise la variable 'postulant.competences' à un tableau vide
    for (const element of postulantDto.competenceIds) {
      let competenceId:number|any = +element;
      const comp:Competence = await this.entityManager.findOneOrFail(
        Competence,
        { where: competenceId }
      )
      comp.postulants.push(postulant)
      await this.entityManager.update(Competence,{ where: competenceId },comp)
      console.log("DONE MOTHERFUCKER !!!!!!!")
    }
    //console.log(postulant)
  }

  async store(postulantDto: CreateUpdatePostulantDto): Promise<Postulant> {
    const postulant: Postulant = this.repository.create(postulantDto)
    const niveauId:number|any = +postulantDto.niveauId
    const langueId:number|any = +postulantDto.langueId
    postulant.competences = []
    postulant.niveau = await this.entityManager.findOneOrFail(
      Niveau,
      { where: niveauId 
    })
    postulant.langue= await this.entityManager.findOneOrFail(
      Langue,
      { where: langueId
    })
    for (const element of postulantDto.competenceIds){
      let competenceId:number|any = +element;
      let comp:Competence = new Competence()
      comp.id = competenceId
      postulant.competences.push(comp)
    }
    console.log(postulant)
    return await this.repository.save(postulant)
  }

  async update(
    id: number,
    postulantDto: CreateUpdatePostulantDto
  ): Promise<UpdateResult> {
    const postulant: Postulant = this.repository.create(postulantDto)
    const niveauId:number|any = +postulantDto.niveauId
    const langueId:number|any = +postulantDto.langueId
    postulant.niveau = await this.entityManager.findOneOrFail(
      Niveau,
      { where: niveauId 
    })
    postulant.langue= await this.entityManager.findOneOrFail(
      Langue,
      { where: langueId
    })
    return await this.repository.update(id, postulant)
  }

  async destroy(id: number): Promise<DeleteResult> {
    const postulant: Postulant = await this.repository.findOneOrFail({ where: { id } })

    return await this.repository.delete(postulant.id)
  }
}
