import { Module } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { MoviesController } from '../controllers/movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import MoviesEntity from '../models/entities/movies.entity';
import FilmConverter from '../models/converters/movies.converter';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesEntity])],
  controllers: [MoviesController],
  providers: [MoviesService, FilmConverter],
})
export class MoviesModule {}
