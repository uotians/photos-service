import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { throwError } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiCreatedResponse({
        description: 'User has been succesfully created',
        type: User,
    })
    @UseGuards(JwtAuthGuard)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.insertUserWithProfile(createUserDto)
    }

    @Post('/admin')
    @ApiOperation({ summary: 'Create an admin'})
    @ApiCreatedResponse({
        description: 'Admin has been succesfully created',
        type: User,
    })
    async createAdmin(@Body() createUserDto: CreateUserDto): Promise<User> {
        const isFirstUser = await this.usersService.getUsers()

        if (isFirstUser.length != 0) {
            throw new ForbiddenException
        } else {
            return await this.usersService.insertUserWithProfile(createUserDto)
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an user'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiResponse({ status: 404, description: 'Could not found matching ID'})
    @ApiCreatedResponse({
        description: 'User has been succesfully updated',
        type: User,
    })
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.updateUser(id, createUserDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all users'})
    @ApiResponse({ status: 200, description: 'OK'})
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an users'})
    @ApiResponse({ status: 200, description: 'OK'})
    @ApiResponse({ status: 404, description: 'Could not found matching ID'})
    async getUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.getUserById(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an user'})
    @ApiResponse({ status: 200, description: 'Deleted'})
    @ApiResponse({ status: 401, description: 'Not logged in'})
    @ApiResponse({ status: 404, description: 'Could not found matching ID'})
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}
