import { AuthService, SelectOption } from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateResult } from 'typeorm'

import { CreateUpdateCompetenceDto } from '../dtos/create-update-competence.dto'
import { CompetenceController } from '../competence.controller'
import { Competence } from '../competence.entity'
import { CompetenceService } from '../competence.service'

describe('CompetenceController', () => {
  let competenceController: CompetenceController
  let competenceService: CompetenceService

  const testCompetence = {
    id: 1,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetenceController,
        {
          provide: CompetenceService,
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
    competenceController = module.get<CompetenceController>(CompetenceController)
    competenceService = module.get<CompetenceService>(CompetenceService)
  })

  describe('CompetenceController', () => {
    it('should list competences', async () => {
      expect.assertions(2)
      const result: Competence[] = [testCompetence] as any[]

      jest.spyOn(competenceService, 'index').mockReturnValue(Promise.resolve(result))

      expect(await competenceController.index()).toBe(result)
      expect(competenceService.index).toHaveBeenCalled()
    })

    it('should get a list of select options', async () => {
      expect.assertions(3)
      const result: Competence[] = [testCompetence] as any[]

      jest.spyOn(competenceService, 'index').mockReturnValue(Promise.resolve(result))

      const selectOptions: SelectOption[] =
        await competenceController.listSelectOptions()

      expect(Array.isArray(selectOptions)).toBe(true)
      expect(selectOptions[0]).toHaveProperty('label')
      expect(selectOptions[0]).toHaveProperty('value')
    })

    it('should show an competence', async () => {
      expect.assertions(2)
      const result: Competence = testCompetence as Competence

      jest.spyOn(competenceService, 'show').mockReturnValue(Promise.resolve(result))

      expect(await competenceController.show(testCompetence.id)).toBe(result)
      expect(competenceService.show).toHaveBeenCalledWith(testCompetence.id)
    })

    it('should store an competence', async () => {
      expect.assertions(2)

      const testCompetenceDto: CreateUpdateCompetenceDto = Object.assign(testCompetence, { roleId: 1 })

      jest
        .spyOn(competenceService, 'store')
        .mockReturnValue(Promise.resolve(testCompetence as any))

      expect(await competenceService.store(testCompetenceDto)).toBe(testCompetence)
      expect(competenceService.store).toHaveBeenCalledWith(testCompetence)
    })

    it('should update an competence', async () => {
      expect.assertions(2)
      const result: UpdateResult = { raw: 'dummy', generatedMaps: [] }

      const testCompetenceDto: CreateUpdateCompetenceDto = Object.assign(testCompetence, { roleId: 1 })

      jest.spyOn(competenceService, 'update').mockReturnValue(Promise.resolve(result))

      expect(await competenceService.update(testCompetence.id, testCompetenceDto)).toBe(result)
      expect(competenceService.update).toHaveBeenCalledWith(testCompetence.id, testCompetence)
    })

    it('should delete an competence', async () => {
      jest.spyOn(competenceService, 'destroy')

      await competenceController.delete(testCompetence.id)

      expect(competenceService.destroy).toBeCalledWith(testCompetence.id)
    })
  })
})
