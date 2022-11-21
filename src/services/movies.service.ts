import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import MoviesEntity from '../models/entities/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';

import MoviesOutput from '../models/dto/output/movies.output';
import MoviesConverter from '../models/converters/movies.converter';
import MoviesInput from '../models/dto/input/movies.input';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly moviesRepo: Repository<MoviesEntity>,
    private readonly moviesConverter: MoviesConverter,
  ) {}

  async findAll(): Promise<MoviesOutput[]> {
    const moviesEntities = await this.moviesRepo.find();

    const outputList = moviesEntities.map((entity) => {
      return this.moviesConverter.entityToOutput(entity);
    });

    return outputList;
  }

  async save(input: MoviesInput) {
    const entity = new MoviesEntity();

    const convertedEntity = this.moviesConverter.inputToEntity(input, entity);

    const savedEntity = await this.moviesRepo.save(convertedEntity);

    const output = this.moviesConverter.entityToOutput(savedEntity);

    return output;
  }

  async update(id: number, input: MoviesInput): Promise<MoviesOutput> {
    const moviesEntity = await this.moviesRepo.findOne({ where: { id: id } });

    const convertedEntity = this.moviesConverter.inputToEntity(
      input,
      moviesEntity,
    );

    const savedEntity = await this.moviesRepo.save(convertedEntity);

    const output = this.moviesConverter.entityToOutput(savedEntity);

    return output;
  }

  async findOne(id: number) {
    const moviesEntity = await this.moviesRepo.findOne({ where: { id: id } });

    const output = this.moviesConverter.entityToOutput(moviesEntity);

    return output;
  }

  async updateTitle(id: number, title: string) {
    const moviesEntity = await this.moviesRepo.findOne({ where: { id } });

    moviesEntity.title = title;

    const moviesSaved = await this.moviesRepo.save(moviesEntity);

    const output = this.moviesConverter.entityToOutput(moviesSaved);

    return output;
  }

  remove(id: number) {
    const remove = this.moviesRepo.delete(id);
  }
}
