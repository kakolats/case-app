import { AuthService, SelectOption } from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateResult } from 'typeorm'

import { CreateUpdatePostulantDto } from '../dtos/create-update-postulant.dto'
import { PostulantController } from '../postulant.controller'
import { Postulant } from '../postulant.entity'
import { PostulantService } from '../postulant.service'

describe('PostulantController', () => {
  let postulantController: PostulantController
  let postulantService: PostulantService

  const testPostulant = {
    id: 1,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostulantController,
        {
          provide: PostulantService,
          useValue: {
            show: jest.fn(),
            destroy: jest.fn(),
            store: jest.fn(),
            update: jest.fn(),
            index: jest.fn()
          }
        },
        {
          provide: AuthService,
          useValue: {
            show: () => Promise.resolve({})
          }
        }
      ]
    }).compile()
    postulantController = module.get<PostulantController>(PostulantController)
    postulantService = module.get<PostulantService>(PostulantService)
  })

  describe('PostulantController', () => {
    it('should list postulants', async () => {
      expect.assertions(2)
      const result: Postulant[] = [testPostulant] as any[]

      jest.spyOn(postulantService, 'index').mockReturnValue(Promise.resolve(result))

      expect(await postulantController.index()).toBe(result)
      expect(postulantService.index).toHaveBeenCalled()
    })

    it('should get a list of select options', async () => {
      expect.assertions(3)
      const result: Postulant[] = [testPostulant] as any[]

      jest.spyOn(postulantService, 'index').mockReturnValue(Promise.resolve(result))

      const selectOptions: SelectOption[] =
        await postulantController.listSelectOptions()

      expect(Array.isArray(selectOptions)).toBe(true)
      expect(selectOptions[0]).toHaveProperty('label')
      expect(selectOptions[0]).toHaveProperty('value')
    })

    it('should show an postulant', async () => {
      expect.assertions(2)
      const result: Postulant = testPostulant as Postulant

      jest.spyOn(postulantService, 'show').mockReturnValue(Promise.resolve(result))

      expect(await postulantController.show(testPostulant.id)).toBe(result)
      expect(postulantService.show).toHaveBeenCalledWith(testPostulant.id)
    })

    it('should store an postulant', async () => {
      expect.assertions(2)

      const testPostulantDto: CreateUpdatePostulantDto = Object.assign(testPostulant, { roleId: 1 })

      jest
        .spyOn(postulantService, 'store')
        .mockReturnValue(Promise.resolve(testPostulant as any))

      expect(await postulantService.store(testPostulantDto)).toBe(testPostulant)
      expect(postulantService.store).toHaveBeenCalledWith(testPostulant)
    })

    it('should update an postulant', async () => {
      expect.assertions(2)
      const result: UpdateResult = { raw: 'dummy', generatedMaps: [] }

      const testPostulantDto: CreateUpdatePostulantDto = Object.assign(testPostulant, { roleId: 1 })

      jest.spyOn(postulantService, 'update').mockReturnValue(Promise.resolve(result))

      expect(await postulantService.update(testPostulant.id, testPostulantDto)).toBe(result)
      expect(postulantService.update).toHaveBeenCalledWith(testPostulant.id, testPostulant)
    })

    it('should delete an postulant', async () => {
      jest.spyOn(postulantService, 'destroy')

      await postulantController.delete(testPostulant.id)

      expect(postulantService.destroy).toBeCalledWith(testPostulant.id)
    })
  })
})
