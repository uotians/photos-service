import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}

    @Post()
    @ApiOperation({ summary: 'Add a category to database'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiCreatedResponse({
        description: 'Photo has been succesfully added',
        type: Category,
    })
    @UseGuards(JwtAuthGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.insertCategory(createCategoryDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories'})
    @ApiResponse({ status: 200, description: 'OK'})
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories()
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a category'})
    @ApiResponse({ status: 200, description: 'Updated'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiResponse({ status: 404, description: 'Could not found matching ID'})
    @ApiCreatedResponse({
        description: 'Category has been succesfully updated',
        type: Category,
    })
    @UseGuards(JwtAuthGuard)
    async updateCategory(@Param('id') id: string, @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.updateCategory(id, createCategoryDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category'})
    @ApiResponse({ status: 200, description: 'Deleted'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiResponse({ status: 404, description: 'Could not found matching ID'})
    @UseGuards(JwtAuthGuard)
    async deleteCategory(@Param('id') id: string): Promise<Category> {
        return await this.categoriesService.deleteCategory(id)
    }
}
