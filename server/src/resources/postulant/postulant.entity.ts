import { CaseProperty } from '@casejs/nest-library'
import { faker } from '@faker-js/faker'
import { Competence } from 'resources/competence/competence.entity'
import { Langue } from 'resources/langue/langue.entity'
import { Niveau } from 'resources/niveau/niveau.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export enum Sexe {
  Homme = "Masculin",
  Femme = "Feminin"
}

@Entity({ name: 'postulants' })
export class Postulant {
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
    seed: (index: number) => faker.name.lastName()
  })
  name: string

  @Column()
  @CaseProperty({
    seed: (index: number) => faker.name.firstName()
  })
  prenom: string

  @Column()
  @CaseProperty({
    seed: (index: number) => faker.random.numeric()
  })
  age: number

  @Column({
    type: "set",
    enum: Sexe,
    default: Sexe.Homme
  })
  @CaseProperty({
    seed: (index: number) => Sexe.Homme
  })
  sexe: string

  @Column()
  @CaseProperty({
    seed: (index: number) => faker.internet.email()
  })
  email: string

  @Column()
  @CaseProperty({
    seed: (index: number) => faker.random.word()
  })
  adresse: string

  @Column()
  @CaseProperty({
    seed: (index: number) => faker.address.country()
  })
  pays: string

  @Column({
    nullable: true
  })

  @Column()
  @CaseProperty({
    seed: (index: number) => faker.internet.url()
  })
  github: string

  @Column({
    nullable:true
  })
  @CaseProperty({
    seed: (index: number) => faker.image.avatar()
  })
  photo: string

  @Column({
    nullable:true
  })
  @CaseProperty({
    seed: (index: number) => faker.image.avatar()
  })
  cv: string


  @ManyToMany(()=> Competence, (competence)=>competence.postulants)
  @JoinTable()
  competences: Competence[]

  @ManyToOne(()=>Niveau,(niveau)=>niveau.postulants)
  niveau: Niveau

  @ManyToOne(()=>Langue,(langue)=>langue.postulants)
  langue:Langue
}
