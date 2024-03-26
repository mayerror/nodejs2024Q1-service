import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
