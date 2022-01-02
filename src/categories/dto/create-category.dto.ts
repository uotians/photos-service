import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoryDto {
    @ApiProperty({ example: 'Animals', description: 'Name of the category'})
    name: string

    @ApiProperty({ example: 'Photos of animals', description: 'Description of the category'})
    description: string
}