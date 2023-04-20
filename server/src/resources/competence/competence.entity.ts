import { CaseProperty } from '@casejs/nest-library'
import { faker } from '@faker-js/faker'
import { Postulant } from 'resources/postulant/postulant.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @ManyToMany(()=>Postulant)
  postulants:Postulant[]
}
