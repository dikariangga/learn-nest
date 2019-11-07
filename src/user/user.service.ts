import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){}

    async showAll(): Promise<UserRO[]>{
        const users = await  this.userRepository.find();
        return users.map(user => user.toResponseObject(false));
    } 

    async login(data: UserDTO): Promise<UserRO[]>{
        const {user_email, user_password} = data;
        const user = await this.userRepository.findOne({where: {user_email}});

        if (!user || !(await user.comparePassword(user_password))){
            throw new HttpException(`Invalid username/password`, HttpStatus.BAD_REQUEST);
        }

        return user.toResponseObject();
    }

    async register(data: UserDTO): Promise<UserRO[]>{
        const {user_email} = data;
        let user = await this.userRepository.findOne({where: {user_email}});

        if (user){
            throw new HttpException(`User already exists...`, HttpStatus.BAD_REQUEST);
        }
        
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);

        return user.toResponseObject(false);
    }
}