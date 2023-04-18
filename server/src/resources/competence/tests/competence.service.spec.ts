import {
  ExcelService,
  PaginationService,
  Paginator
} from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { CreateUpdateCompetenceDto } from '../dtos/create-update-competence.dto'
import { Competence } from '../competence.entity'
import { CompetenceService } from '../competence.service'

describe('CompetenceService', () => {
  let competenceService: CompetenceService
  let repositoryMock: MockType<Repository<Competence>>

  const testCompetence = { id: 1, name: 'Test' }
  const testCompetenceDto: CreateUpdateCompetenceDto = {
    
  }
  const createQueryBuilder: any = {
    select: () => createQueryBuilder,
    addSelect: () => createQueryBuilder,
    orderBy: () => createQueryBuilder,
    groupBy: () => createQueryBuilder,
    where: () => createQueryBuilder,
    andWhere: () => createQueryBuilder,
    leftJoinAndSelect: () => createQueryBuilder,
    getMany: () => [testCompetence],
    getOne: () => testCompetence
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetenceService,
        {
          provide: getRepositoryToken(Competence),
          useFactory: repositoryMockFactory
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: () => ({
              data: [testCompetence],
              currentPage: 1,
              lastPage: 1,
              from: 1,
              to: 1,
              total: 1,
              perPage: 1
            })
          }
        },
        {
          provide: ExcelService,
          useValue: {
            export: () => 'path-to-csv-file.csv'
          }
        }
      ]
    }).compile()
    competenceService = module.get<CompetenceService>(CompetenceService)
    repositoryMock = module.get(getRepositoryToken(Competence))
  })

  it('should list competences', async () => {
    expect.assertions(8)

    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )

    const competencePaginator: Paginator<Competence> = (await competenceService.index(
      {}
    )) as Paginator<Competence>
    const competences: Competence[] = (await competenceService.index({
      withoutPagination: true
    })) as Competence[]

    expect(Array.isArray(competences)).toBe(true)
    expect(competencePaginator).toHaveProperty('currentPage')
    expect(competencePaginator).toHaveProperty('lastPage')
    expect(competencePaginator).toHaveProperty('from')
    expect(competencePaginator).toHaveProperty('to')
    expect(competencePaginator).toHaveProperty('total')
    expect(competencePaginator).toHaveProperty('perPage')
    expect(Array.isArray(competencePaginator.data)).toBe(true)
  })

  it('should show an competence', async () => {
    expect.assertions(2)
    repositoryMock.findOneOrFail?.mockReturnValue(testCompetence)

    await expect(competenceService.show(testCompetence.id)).resolves.toEqual(testCompetence)
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith({
      where: { id: testCompetence.id }
    })
  })

  it('should store an competence', async () => {
    const dummyId = 56

    repositoryMock.create?.mockReturnValue(testCompetenceDto)
    repositoryMock.save?.mockReturnValue(
      Object.assign(testCompetenceDto, { id: dummyId })
    )

    const storedCompetence: Competence = await competenceService.store(testCompetenceDto)

    expect(storedCompetence).toHaveProperty('id', dummyId)
  })

  it('should update an competence', async () => {
    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )
    repositoryMock.create?.mockReturnValue(testCompetenceDto)

    const updatedResult: UpdateResult = await competenceService.update(1, testCompetenceDto)

    expect(repositoryMock.create).toHaveBeenCalled()
    expect(repositoryMock.update).toHaveBeenCalled()
  })

  it('should delete an competence', async () => {
    expect.assertions(2)

    const mockDeleteResult = { raw: 'mock data delete result' }

    repositoryMock.delete?.mockReturnValue(mockDeleteResult)
    repositoryMock.findOneOrFail?.mockReturnValue(testCompetence)

    await expect(competenceService.destroy(testCompetence.id)).resolves.toEqual(
      mockDeleteResult
    )
    expect(repositoryMock.delete).toHaveBeenCalledWith(testCompetence.id)
  })
})

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    create: jest.fn(),
    createQueryBuilder: jest.fn(),
    delete: jest.fn(),
    findOneOrFail: jest.fn(),
    save: jest.fn(),
    update: jest.fn()
  })
)

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}
