import { CaseProperty } from '@casejs/nest-library'
import { faker } from '@faker-js/faker'
import { Postulant } from 'resources/postulant/postulant.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'niveaus' })
export class Niveau {
  public static searchableFields: string[] = ['id']
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

  @OneToMany(()=>Postulant,(postulant)=>postulant.niveau)
  postulants:Postulant[]
}
