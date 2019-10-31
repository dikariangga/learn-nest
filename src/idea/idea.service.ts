import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private ideaRepository: Repository<IdeaEntity>
    ) {}

    async showAll(){
        try{
            const data = await this.ideaRepository.find();

            Logger.log(`Show all data unsuccessfully...`, `Log CRUD`);
            return {
                success: true,
                message: `Show all data successfully...`,
                data: data
            }
        }catch(e){
            Logger.log(`Show all data unsuccessfully...\nError : ${e}`, `Log CRUD`);
            return {
                success: false,
                message: `Show all data unsuccessfully...`,
                error: e
            }
        }
    }

    async create(data: IdeaDTO){
        try{
            const idea = await this.ideaRepository.create(data);
            const result = await this.ideaRepository.save(idea);

            Logger.log(`Create data successfully...`, `Log CRUD`);
            return {
                success: true,
                message: `Create data successfully...`,
                data: result
            }
        }catch(e){
            Logger.log(`Create data unsuccessfully...\nError : ${e}`, `Log CRUD`);
            return {
                success: false,
                message: `Create data unsuccessfully...`,
                error: e
            }
        }
    }

    async read(id: string){
        try{
            const data = await this.ideaRepository.query(`SELECT * FROM idea WHERE id = '`+id+`'`);

            if(data.length > 0){
                Logger.log(`Show data id : ${id} successfully...`, `Log CRUD`);
                return {
                    success: true,
                    message: `Show data id : ${id} successfully...`,
                    data: data
                }
            } else {
                Logger.log(`Show data id : ${id} not found...`, `Log CRUD`);
                return {
                    success: false,
                    message: `Show data id : ${id} not found...`
                }
            }
        }catch(e){
            Logger.log(`Show data id : ${id} unsuccessfully...\nError : ${e}`, `Log CRUD`);
            return {
                success: false,
                message: `Show data id : ${id} unsuccessfully...`,
                error: e
            }
        }
    }

    async update(id: string, data: Partial<IdeaDTO>){
        try{
            await this.ideaRepository.update({id}, data);
            const update = await this.ideaRepository.findOne({id});
            
            Logger.log(`Update data id : ${id} successfully...`, `Log CRUD`);
            return {
                success: true,
                message: `Update data id : ${id} successfully...`,
                data: update
            }
        }catch(e){
            Logger.log(`Update data id : ${id} unsuccessfully...\nError : ${e}`, `Log CRUD`);
            return {
                success: false,
                message: `Update data id : ${id} unsuccessfully...`,
                error: e
            }
        }
    }

    async destroy(id: string){
        try{
            await this.ideaRepository.delete({id});
            
            Logger.log(`Delete data id : ${id} successfully...`, `Log CRUD`);
            return {
                success: true,
                message: `Delete data id : ${id} successfully...`
            }
        }catch(e){
            Logger.log(`Delete data id : ${id} unsuccessfully...\nError : ${e}`, `Log CRUD`);
            return {
                success: false,
                message: `Delete data id : ${id} unsuccessfully...`,
                error: e
            }
        }
    }
}
