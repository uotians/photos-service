import { ApiProperty } from "@nestjs/swagger"

export class CreatePhotoDto {
    @ApiProperty({ example: 'Friendly frog', description: 'Name of the photo'})
    name: string

    @ApiProperty({ example: 'Picture of a frog in a pond', description: 'Description of the photo'})
    description: string

    @ApiProperty({ example: 'http://picturebank.com/frog.jpg', description: 'URL to picture'})
    url: string

    @ApiProperty({ example: 'user@gmail.com', description: 'Users email'})
    user_email: string

    @ApiProperty({ example: ['Turtle', 'Animal'], description: 'Categories where animal belongs'})
    categories: string[]
}