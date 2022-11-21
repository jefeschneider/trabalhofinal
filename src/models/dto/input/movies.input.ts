import { ApiProperty } from '@nestjs/swagger';

export default class MoviesInput {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;
}
