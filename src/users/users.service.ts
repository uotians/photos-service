import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly profilesService: ProfilesService,
        @InjectRepository(Profile) private readonly profilesRepository: Repository<Profile>) {}

    async insertUserWithProfile(createUserDto: CreateUserDto): Promise<User> {
        const profile = await this.profilesService.insertProfile(
            createUserDto.profile.gender,
            createUserDto.profile.photo
        )

        const user = new User()
        user.name = createUserDto.name
        user.username = createUserDto.username
        user.password = createUserDto.password
        user.profile = profile
        
        return this.usersRepository.save(user)
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ["profile"]})
    }

    async getUserById(id: string): Promise<User> {
        return await this.usersRepository.findOneOrFail(id, {relations: ["profile"]})
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.usersRepository.findOne({where: {username: username}})
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.usersRepository.findOneOrFail(id, {relations: ["profile"]})
        
        let profile = null
        if (user && user.profile) {
            profile = this.profilesService.deleteProfile(user.profile.id)
        }
        const status = await this.usersRepository.delete(id)
        return user
    }

    async updateUser(id: string, createUserDto: CreateUserDto): Promise<User> {
        const patch = await this.usersRepository.findOneOrFail(id, {relations: ['profile']})
        
        if (createUserDto.username) {
            await this.usersRepository.update( id, {username: createUserDto.username})
        }
        if (createUserDto.name) {
            await this.usersRepository.update( id, {name: createUserDto.name})
        }
        if (createUserDto.password) {
            await this.usersRepository.update( id, {password: createUserDto.password})
        }

        const profileId = patch.profile.id

        if (createUserDto.profile.gender) {
            await this.profilesRepository.update( profileId, {gender: createUserDto.profile.gender})
        }
        if (createUserDto.profile.photo) {
            await this.profilesRepository.update( profileId, {photo: createUserDto.profile.photo})
        }

        return await this.usersRepository.findOneOrFail(id, { relations: ['profile']})
    }
}
