import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUpdatePostulantDto {


  @IsNotEmpty()
  @IsString()
  name: string
}
