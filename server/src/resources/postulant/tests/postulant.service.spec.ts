import {
  ExcelService,
  PaginationService,
  Paginator
} from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { CreateUpdatePostulantDto } from '../dtos/create-update-postulant.dto'
import { Postulant } from '../postulant.entity'
import { PostulantService } from '../postulant.service'

describe('PostulantService', () => {
  let postulantService: PostulantService
  let repositoryMock: MockType<Repository<Postulant>>

  const testPostulant = { id: 1, name: 'Test' }
  const testPostulantDto: CreateUpdatePostulantDto = {
    
  }
  const createQueryBuilder: any = {
    select: () => createQueryBuilder,
    addSelect: () => createQueryBuilder,
    orderBy: () => createQueryBuilder,
    groupBy: () => createQueryBuilder,
    where: () => createQueryBuilder,
    andWhere: () => createQueryBuilder,
    leftJoinAndSelect: () => createQueryBuilder,
    getMany: () => [testPostulant],
    getOne: () => testPostulant
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostulantService,
        {
          provide: getRepositoryToken(Postulant),
          useFactory: repositoryMockFactory
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: () => ({
              data: [testPostulant],
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
    postulantService = module.get<PostulantService>(PostulantService)
    repositoryMock = module.get(getRepositoryToken(Postulant))
  })

  it('should list postulants', async () => {
    expect.assertions(8)

    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )

    const postulantPaginator: Paginator<Postulant> = (await postulantService.index(
      {}
    )) as Paginator<Postulant>
    const postulants: Postulant[] = (await postulantService.index({
      withoutPagination: true
    })) as Postulant[]

    expect(Array.isArray(postulants)).toBe(true)
    expect(postulantPaginator).toHaveProperty('currentPage')
    expect(postulantPaginator).toHaveProperty('lastPage')
    expect(postulantPaginator).toHaveProperty('from')
    expect(postulantPaginator).toHaveProperty('to')
    expect(postulantPaginator).toHaveProperty('total')
    expect(postulantPaginator).toHaveProperty('perPage')
    expect(Array.isArray(postulantPaginator.data)).toBe(true)
  })

  it('should show an postulant', async () => {
    expect.assertions(2)
    repositoryMock.findOneOrFail?.mockReturnValue(testPostulant)

    await expect(postulantService.show(testPostulant.id)).resolves.toEqual(testPostulant)
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith({
      where: { id: testPostulant.id }
    })
  })

  it('should store an postulant', async () => {
    const dummyId = 56

    repositoryMock.create?.mockReturnValue(testPostulantDto)
    repositoryMock.save?.mockReturnValue(
      Object.assign(testPostulantDto, { id: dummyId })
    )

    const storedPostulant: Postulant = await postulantService.store(testPostulantDto)

    expect(storedPostulant).toHaveProperty('id', dummyId)
  })

  it('should update an postulant', async () => {
    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )
    repositoryMock.create?.mockReturnValue(testPostulantDto)

    const updatedResult: UpdateResult = await postulantService.update(1, testPostulantDto)

    expect(repositoryMock.create).toHaveBeenCalled()
    expect(repositoryMock.update).toHaveBeenCalled()
  })

  it('should delete an postulant', async () => {
    expect.assertions(2)

    const mockDeleteResult = { raw: 'mock data delete result' }

    repositoryMock.delete?.mockReturnValue(mockDeleteResult)
    repositoryMock.findOneOrFail?.mockReturnValue(testPostulant)

    await expect(postulantService.destroy(testPostulant.id)).resolves.toEqual(
      mockDeleteResult
    )
    expect(repositoryMock.delete).toHaveBeenCalledWith(testPostulant.id)
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
