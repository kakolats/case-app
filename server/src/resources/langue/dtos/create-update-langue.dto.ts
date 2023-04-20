import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUpdateLangueDto {


  @IsNotEmpty()
  @IsString()
  libelle: string
}
