import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "src/photos/entities/photo.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    description: string;

    @ManyToMany(() => Photo, (photo) => photo.categories)
    photos: Photo[]
    categoryRepository: any;
}