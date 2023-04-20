import {
  ExcelService,
  PaginationService,
  Paginator
} from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { CreateUpdateNiveauDto } from '../dtos/create-update-niveau.dto'
import { Niveau } from '../niveau.entity'
import { NiveauService } from '../niveau.service'

describe('NiveauService', () => {
  let niveauService: NiveauService
  let repositoryMock: MockType<Repository<Niveau>>

  const testNiveau = { id: 1, name: 'Test' }
  const testNiveauDto: CreateUpdateNiveauDto = {
    
  }
  const createQueryBuilder: any = {
    select: () => createQueryBuilder,
    addSelect: () => createQueryBuilder,
    orderBy: () => createQueryBuilder,
    groupBy: () => createQueryBuilder,
    where: () => createQueryBuilder,
    andWhere: () => createQueryBuilder,
    leftJoinAndSelect: () => createQueryBuilder,
    getMany: () => [testNiveau],
    getOne: () => testNiveau
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NiveauService,
        {
          provide: getRepositoryToken(Niveau),
          useFactory: repositoryMockFactory
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: () => ({
              data: [testNiveau],
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
    niveauService = module.get<NiveauService>(NiveauService)
    repositoryMock = module.get(getRepositoryToken(Niveau))
  })

  it('should list niveaus', async () => {
    expect.assertions(8)

    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )

    const niveauPaginator: Paginator<Niveau> = (await niveauService.index(
      {}
    )) as Paginator<Niveau>
    const niveaus: Niveau[] = (await niveauService.index({
      withoutPagination: true
    })) as Niveau[]

    expect(Array.isArray(niveaus)).toBe(true)
    expect(niveauPaginator).toHaveProperty('currentPage')
    expect(niveauPaginator).toHaveProperty('lastPage')
    expect(niveauPaginator).toHaveProperty('from')
    expect(niveauPaginator).toHaveProperty('to')
    expect(niveauPaginator).toHaveProperty('total')
    expect(niveauPaginator).toHaveProperty('perPage')
    expect(Array.isArray(niveauPaginator.data)).toBe(true)
  })

  it('should show an niveau', async () => {
    expect.assertions(2)
    repositoryMock.findOneOrFail?.mockReturnValue(testNiveau)

    await expect(niveauService.show(testNiveau.id)).resolves.toEqual(testNiveau)
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith({
      where: { id: testNiveau.id }
    })
  })

  it('should store an niveau', async () => {
    const dummyId = 56

    repositoryMock.create?.mockReturnValue(testNiveauDto)
    repositoryMock.save?.mockReturnValue(
      Object.assign(testNiveauDto, { id: dummyId })
    )

    const storedNiveau: Niveau = await niveauService.store(testNiveauDto)

    expect(storedNiveau).toHaveProperty('id', dummyId)
  })

  it('should update an niveau', async () => {
    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )
    repositoryMock.create?.mockReturnValue(testNiveauDto)

    const updatedResult: UpdateResult = await niveauService.update(1, testNiveauDto)

    expect(repositoryMock.create).toHaveBeenCalled()
    expect(repositoryMock.update).toHaveBeenCalled()
  })

  it('should delete an niveau', async () => {
    expect.assertions(2)

    const mockDeleteResult = { raw: 'mock data delete result' }

    repositoryMock.delete?.mockReturnValue(mockDeleteResult)
    repositoryMock.findOneOrFail?.mockReturnValue(testNiveau)

    await expect(niveauService.destroy(testNiveau.id)).resolves.toEqual(
      mockDeleteResult
    )
    expect(repositoryMock.delete).toHaveBeenCalledWith(testNiveau.id)
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
