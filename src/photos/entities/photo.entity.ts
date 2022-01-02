import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    url: string;

    @ManyToOne(() => User, (user) => user.photos)
    user: User;

    @ManyToMany(() => Category, (category) => category.photos, {cascade: true})
    @JoinTable()
    categories: Category[]
}