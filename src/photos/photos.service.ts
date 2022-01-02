import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {

    constructor(
        @InjectRepository(Photo) private photosRepository: Repository<Photo>,
        private readonly usersService: UsersService,
        private readonly categoriesService: CategoriesService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto) {
        const user = await this.usersService.findUserByUsername(createPhotoDto.user_email)
  
        let categories = []
        for (let i = 0; i < createPhotoDto.categories.length; i++) {
            let catName = createPhotoDto.categories[i]
            let category = await this.categoriesService.findCategoryByName(catName)
           
            if(category) {
                categories.push(category)
            } else {
                console.log(`Category ${catName} not found!`)
            }
        }

        const photo = new Photo()
        photo.name = createPhotoDto.name
        photo.description = createPhotoDto.description
        photo.url = createPhotoDto.url
        photo.user = user
        photo.categories = categories

        return await this.photosRepository.save(photo)
    }

    async getPhotos(): Promise<Photo[]> {
        return await this.photosRepository.find({relations: ["user", "categories"]})
    }

    async deletePhoto(id: number): Promise<Photo> {
        const photos = await this.photosRepository.findOneOrFail(id)
        await this.photosRepository.remove(photos)
        return photos
    }

    async updatePhoto(id: number, createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const patch = await this.photosRepository.findOneOrFail(id, { relations: ['categories']})

        if (createPhotoDto.name) {
            await this.photosRepository.update( id, { name: createPhotoDto.name})
        }
        if (createPhotoDto.description) {
            await this.photosRepository.update( id, { description: createPhotoDto.description})
        }
        if (createPhotoDto.url) {
            await this.photosRepository.update( id, { url: createPhotoDto.url})
        }
        
        return await this.photosRepository.findOneOrFail(id, { relations: ['categories']})
    }
}
