import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {

    constructor(private photosService: PhotosService) { }

    @Post()
    @ApiOperation({ summary: 'Add a photo to database'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiCreatedResponse({
        description: 'Photo has been succesfully added',
        type: Photo,
    })
    @UseGuards(JwtAuthGuard)
    async createPhoto(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all photos'})
    @ApiResponse({ status: 200, description: 'OK'})
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos()
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a photo'})
    @ApiResponse({ status: 200, description: 'Deleted'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiResponse({ status: 404, description: 'Could not found matching ID'})
    @UseGuards(JwtAuthGuard)
    async deletePhoto(@Param('id') id: number): Promise<Photo> {
        return await this.photosService.deletePhoto(id)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a photo'})
    @ApiResponse({ status: 200, description: 'Updated'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiResponse({ status: 404, description: 'Could not found matching ID'})
    @ApiCreatedResponse({
        description: 'Photo has been succesfully updated',
        type: Photo,
    })
    @UseGuards(JwtAuthGuard)
    async updatePhoto(@Param('id') id: number, @Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.updatePhoto(id, createPhotoDto)
    }
}
