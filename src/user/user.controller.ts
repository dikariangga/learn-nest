import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../shared/validation.pipe';

import { UserDTO } from './user.dto';

@Controller()
export class UserController {
    constructor(private userService: UserService){}

    @Get('api/users')
    showAll(){
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDTO){
        return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO){
        return this.userService.register(data);
    }
}
