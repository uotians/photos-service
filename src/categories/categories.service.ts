import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    categoryService: any;

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category()
        category.name = createCategoryDto.name
        category.description = createCategoryDto.description
        return await this.categoryRepository.save(category)
    }
    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find()
    }
    async findCategoryByName(name: string): Promise<Category> {
        // return await this.categoryRepository.findOne(name)
        // Alla oleva koodi on tunneilla tehty, mutta se ei toiminut
        return await this.categoryRepository.findOne({ where: { name: name } })
    }
    async deleteCategory(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOneOrFail(id)

        await this.categoryRepository.remove(category)
        return category
    }
    async updateCategory(id: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const patch = await this.categoryRepository.findOneOrFail(id, { relations: ['photos'] })

        if (createCategoryDto.name) {
            await this.categoryRepository.update( id, { name: createCategoryDto.name })
        }
        if (createCategoryDto.description) {
            await this.categoryRepository.update( id, {description: createCategoryDto.description })
        }

        return await this.categoryRepository.findOneOrFail(id, { relations: ['photos'] })
    }
}


