import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUpdateNiveauDto {


  @IsNotEmpty()
  @IsString()
  libelle: string
}
