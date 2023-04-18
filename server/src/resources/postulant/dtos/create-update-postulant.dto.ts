import { IsNotEmpty, IsString } from 'class-validator'
import { Competence } from 'resources/competence/competence.entity'

export class CreateUpdatePostulantDto {


  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  prenom: string

  @IsNotEmpty()
  @IsString()
  competences: Competence[]
}
