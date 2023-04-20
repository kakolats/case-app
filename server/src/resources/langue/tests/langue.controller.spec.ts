import { AuthService, SelectOption } from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateResult } from 'typeorm'

import { CreateUpdateLangueDto } from '../dtos/create-update-langue.dto'
import { LangueController } from '../langue.controller'
import { Langue } from '../langue.entity'
import { LangueService } from '../langue.service'

describe('LangueController', () => {
  let langueController: LangueController
  let langueService: LangueService

  const testLangue = {
    id: 1,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LangueController,
        {
          provide: LangueService,
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
    langueController = module.get<LangueController>(LangueController)
    langueService = module.get<LangueService>(LangueService)
  })

  describe('LangueController', () => {
    it('should list langues', async () => {
      expect.assertions(2)
      const result: Langue[] = [testLangue] as any[]

      jest.spyOn(langueService, 'index').mockReturnValue(Promise.resolve(result))

      expect(await langueController.index()).toBe(result)
      expect(langueService.index).toHaveBeenCalled()
    })

    it('should get a list of select options', async () => {
      expect.assertions(3)
      const result: Langue[] = [testLangue] as any[]

      jest.spyOn(langueService, 'index').mockReturnValue(Promise.resolve(result))

      const selectOptions: SelectOption[] =
        await langueController.listSelectOptions()

      expect(Array.isArray(selectOptions)).toBe(true)
      expect(selectOptions[0]).toHaveProperty('label')
      expect(selectOptions[0]).toHaveProperty('value')
    })

    it('should show an langue', async () => {
      expect.assertions(2)
      const result: Langue = testLangue as Langue

      jest.spyOn(langueService, 'show').mockReturnValue(Promise.resolve(result))

      expect(await langueController.show(testLangue.id)).toBe(result)
      expect(langueService.show).toHaveBeenCalledWith(testLangue.id)
    })

    it('should store an langue', async () => {
      expect.assertions(2)

      const testLangueDto: CreateUpdateLangueDto = Object.assign(testLangue, { roleId: 1 })

      jest
        .spyOn(langueService, 'store')
        .mockReturnValue(Promise.resolve(testLangue as any))

      expect(await langueService.store(testLangueDto)).toBe(testLangue)
      expect(langueService.store).toHaveBeenCalledWith(testLangue)
    })

    it('should update an langue', async () => {
      expect.assertions(2)
      const result: UpdateResult = { raw: 'dummy', generatedMaps: [] }

      const testLangueDto: CreateUpdateLangueDto = Object.assign(testLangue, { roleId: 1 })

      jest.spyOn(langueService, 'update').mockReturnValue(Promise.resolve(result))

      expect(await langueService.update(testLangue.id, testLangueDto)).toBe(result)
      expect(langueService.update).toHaveBeenCalledWith(testLangue.id, testLangue)
    })

    it('should delete an langue', async () => {
      jest.spyOn(langueService, 'destroy')

      await langueController.delete(testLangue.id)

      expect(langueService.destroy).toBeCalledWith(testLangue.id)
    })
  })
})
