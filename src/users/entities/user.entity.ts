import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { Photo } from "src/photos/entities/photo.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({unique: true})
    @IsEmail()
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;
    
    @Column()
    @ApiProperty()
    name: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Photo, (photo) => photo.user)
    photos?: Photo[]
}
