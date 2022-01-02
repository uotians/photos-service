import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @ApiOperation({ summary: 'Login to service' })
  @ApiResponse({ status: 200, description: 'Logged in' })
  @ApiResponse({ status: 401, description: 'Username or password failed' })
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    const token = this.authService.login(req.user)
    return token
  }
}
