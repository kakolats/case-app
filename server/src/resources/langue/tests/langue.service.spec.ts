import {
  ExcelService,
  PaginationService,
  Paginator
} from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { CreateUpdateLangueDto } from '../dtos/create-update-langue.dto'
import { Langue } from '../langue.entity'
import { LangueService } from '../langue.service'

describe('LangueService', () => {
  let langueService: LangueService
  let repositoryMock: MockType<Repository<Langue>>

  const testLangue = { id: 1, name: 'Test' }
  const testLangueDto: CreateUpdateLangueDto = {
    
  }
  const createQueryBuilder: any = {
    select: () => createQueryBuilder,
    addSelect: () => createQueryBuilder,
    orderBy: () => createQueryBuilder,
    groupBy: () => createQueryBuilder,
    where: () => createQueryBuilder,
    andWhere: () => createQueryBuilder,
    leftJoinAndSelect: () => createQueryBuilder,
    getMany: () => [testLangue],
    getOne: () => testLangue
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LangueService,
        {
          provide: getRepositoryToken(Langue),
          useFactory: repositoryMockFactory
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: () => ({
              data: [testLangue],
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
    langueService = module.get<LangueService>(LangueService)
    repositoryMock = module.get(getRepositoryToken(Langue))
  })

  it('should list langues', async () => {
    expect.assertions(8)

    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )

    const languePaginator: Paginator<Langue> = (await langueService.index(
      {}
    )) as Paginator<Langue>
    const langues: Langue[] = (await langueService.index({
      withoutPagination: true
    })) as Langue[]

    expect(Array.isArray(langues)).toBe(true)
    expect(languePaginator).toHaveProperty('currentPage')
    expect(languePaginator).toHaveProperty('lastPage')
    expect(languePaginator).toHaveProperty('from')
    expect(languePaginator).toHaveProperty('to')
    expect(languePaginator).toHaveProperty('total')
    expect(languePaginator).toHaveProperty('perPage')
    expect(Array.isArray(languePaginator.data)).toBe(true)
  })

  it('should show an langue', async () => {
    expect.assertions(2)
    repositoryMock.findOneOrFail?.mockReturnValue(testLangue)

    await expect(langueService.show(testLangue.id)).resolves.toEqual(testLangue)
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith({
      where: { id: testLangue.id }
    })
  })

  it('should store an langue', async () => {
    const dummyId = 56

    repositoryMock.create?.mockReturnValue(testLangueDto)
    repositoryMock.save?.mockReturnValue(
      Object.assign(testLangueDto, { id: dummyId })
    )

    const storedLangue: Langue = await langueService.store(testLangueDto)

    expect(storedLangue).toHaveProperty('id', dummyId)
  })

  it('should update an langue', async () => {
    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )
    repositoryMock.create?.mockReturnValue(testLangueDto)

    const updatedResult: UpdateResult = await langueService.update(1, testLangueDto)

    expect(repositoryMock.create).toHaveBeenCalled()
    expect(repositoryMock.update).toHaveBeenCalled()
  })

  it('should delete an langue', async () => {
    expect.assertions(2)

    const mockDeleteResult = { raw: 'mock data delete result' }

    repositoryMock.delete?.mockReturnValue(mockDeleteResult)
    repositoryMock.findOneOrFail?.mockReturnValue(testLangue)

    await expect(langueService.destroy(testLangue.id)).resolves.toEqual(
      mockDeleteResult
    )
    expect(repositoryMock.delete).toHaveBeenCalledWith(testLangue.id)
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
