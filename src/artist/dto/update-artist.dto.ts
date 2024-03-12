import { IsNotEmpty } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}
