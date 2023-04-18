import { CaseProperty } from '@casejs/nest-library'
import { faker } from '@faker-js/faker'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'competences' })
export class Competence {
  public static searchableFields: string[] = ['id','libelle']
  public static displayName: string = 'id'

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ select: false })
  createdAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date

  @Column('varchar', {})
  @CaseProperty({
    seed: (index: number) => faker.random.word()
  })
  libelle: string
}
