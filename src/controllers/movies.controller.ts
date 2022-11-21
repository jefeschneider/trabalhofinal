import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Post,
  Query,
  Body,
  Put,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import MoviesOutput from '../models/dto/output/movies.output';
import MoviesInput from '../models/dto/input/movies.input';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiCreatedResponse({ type: MoviesOutput, isArray: true })
  findAll(): Promise<MoviesOutput[]> {
    return this.moviesService.findAll();
  }

  @Post()
  save(@Body() input: MoviesInput) {
    return this.moviesService.save(input);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: MoviesOutput })
  update(
    @Param('id') id: string,
    @Body() input: MoviesInput,
  ): Promise<MoviesOutput> {
    return this.moviesService.update(+id, input);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: MoviesOutput })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: MoviesOutput })
  updateTitle(@Param('id') id: string, @Query('title') title: string) {
    return this.moviesService.updateTitle(+id, title);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
