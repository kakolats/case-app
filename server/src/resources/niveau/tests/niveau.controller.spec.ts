import { AuthService, SelectOption } from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateResult } from 'typeorm'

import { CreateUpdateNiveauDto } from '../dtos/create-update-niveau.dto'
import { NiveauController } from '../niveau.controller'
import { Niveau } from '../niveau.entity'
import { NiveauService } from '../niveau.service'

describe('NiveauController', () => {
  let niveauController: NiveauController
  let niveauService: NiveauService

  const testNiveau = {
    id: 1,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NiveauController,
        {
          provide: NiveauService,
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
    niveauController = module.get<NiveauController>(NiveauController)
    niveauService = module.get<NiveauService>(NiveauService)
  })

  describe('NiveauController', () => {
    it('should list niveaus', async () => {
      expect.assertions(2)
      const result: Niveau[] = [testNiveau] as any[]

      jest.spyOn(niveauService, 'index').mockReturnValue(Promise.resolve(result))

      expect(await niveauController.index()).toBe(result)
      expect(niveauService.index).toHaveBeenCalled()
    })

    it('should get a list of select options', async () => {
      expect.assertions(3)
      const result: Niveau[] = [testNiveau] as any[]

      jest.spyOn(niveauService, 'index').mockReturnValue(Promise.resolve(result))

      const selectOptions: SelectOption[] =
        await niveauController.listSelectOptions()

      expect(Array.isArray(selectOptions)).toBe(true)
      expect(selectOptions[0]).toHaveProperty('label')
      expect(selectOptions[0]).toHaveProperty('value')
    })

    it('should show an niveau', async () => {
      expect.assertions(2)
      const result: Niveau = testNiveau as Niveau

      jest.spyOn(niveauService, 'show').mockReturnValue(Promise.resolve(result))

      expect(await niveauController.show(testNiveau.id)).toBe(result)
      expect(niveauService.show).toHaveBeenCalledWith(testNiveau.id)
    })

    it('should store an niveau', async () => {
      expect.assertions(2)

      const testNiveauDto: CreateUpdateNiveauDto = Object.assign(testNiveau, { roleId: 1 })

      jest
        .spyOn(niveauService, 'store')
        .mockReturnValue(Promise.resolve(testNiveau as any))

      expect(await niveauService.store(testNiveauDto)).toBe(testNiveau)
      expect(niveauService.store).toHaveBeenCalledWith(testNiveau)
    })

    it('should update an niveau', async () => {
      expect.assertions(2)
      const result: UpdateResult = { raw: 'dummy', generatedMaps: [] }

      const testNiveauDto: CreateUpdateNiveauDto = Object.assign(testNiveau, { roleId: 1 })

      jest.spyOn(niveauService, 'update').mockReturnValue(Promise.resolve(result))

      expect(await niveauService.update(testNiveau.id, testNiveauDto)).toBe(result)
      expect(niveauService.update).toHaveBeenCalledWith(testNiveau.id, testNiveau)
    })

    it('should delete an niveau', async () => {
      jest.spyOn(niveauService, 'destroy')

      await niveauController.delete(testNiveau.id)

      expect(niveauService.destroy).toBeCalledWith(testNiveau.id)
    })
  })
})
