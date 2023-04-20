import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Competence } from 'resources/competence/competence.entity'

export class CreateUpdatePostulantDto {


  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  prenom: string

  @IsArray()
  @IsOptional()
  competenceIds: string[]

  @IsNotEmpty()
  readonly niveauId:number|string

  @IsNotEmpty()
  readonly langueId:number|string

  @IsOptional()
  @IsString()
  readonly photo:string

  @IsOptional()
  @IsString()
  readonly cv:string
}
