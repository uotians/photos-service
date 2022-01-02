import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Users username'})
    username: string;

    @ApiProperty({ example: 'Koodaus1', description: 'Users password'})
    password: string

    @ApiProperty({ example: 'John Bon', description: 'Users name'})
    name: string;

    @ApiProperty({ example: {gender: 'male', photo: 'photo-url'}})
    profile: {

        gender: string;

        photo: string;
    }
}