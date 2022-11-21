import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export default class MoviesEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'image', type: 'varchar' })
  image: string;

  @Column({
    name: 'create',
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    name: 'update',
    type: 'timestamp',
  })
  updatedAt: Date;
}
