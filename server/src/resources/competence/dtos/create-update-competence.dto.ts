import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUpdateCompetenceDto {


  @IsNotEmpty()
  @IsString()
  libelle: string

  
}
