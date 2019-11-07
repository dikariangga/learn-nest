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
        const now = Date.now();
        
        try{
            const data = await this.ideaRepository.find();
            if (data.length > 0) {
                Logger.log(`Show all data successfully... ${Date.now() - now}ms`, `IdeaService`);
                return {
                    success: true,
                    message: `Show all data successfully...`,
                    data: data
                }
            } else {
                Logger.error(`Show all data unsuccessfully... ${Date.now() - now}ms`,`Error : Data not found (empty)... `, `IdeaService`);
                return {
                    success: false,
                    message: `Data not found (empty)...`,
                    data: null
                }
            }
        }catch(e){
            Logger.error(`Show all data unsuccessfully... ${Date.now() - now}ms`,`Error : ${e}`, `IdeaService`);
            return {
                success: false,
                message: `Show all data unsuccessfully...`,
                error: e
            }
        }
    }

    async create(data: IdeaDTO){
        const now = Date.now();
        
        try{
            const idea = await this.ideaRepository.create(data);
            const result = await this.ideaRepository.save(idea);

            Logger.log(`Create data successfully... ${Date.now() - now}ms`, `IdeaService`);
            return {
                success: true,
                message: `Create data successfully...`,
                data: result
            }
        }catch(e){
            Logger.error(`Create data unsuccessfully... ${Date.now() - now}ms`, `Error : ${e}`, `IdeaService`);
            return {
                success: false,
                message: `Create data unsuccessfully...`,
                error: e
            }
        }
    }

    async read(id: string){
        const now = Date.now();
        
        try{
            const data = await this.ideaRepository.findOne({id});
            // return data;

            if(data){
                Logger.log(`Show data id : ${id} successfully... ${Date.now() - now}ms`, `IdeaService`);
                return {
                    success: true,
                    message: `Show data id : ${id} successfully...`,
                    data: data
                }
            } else {
                Logger.error(`Show data unsuccessfully... ${Date.now() - now}ms`, `ID : ${id} doesn't exist...`, `IdeaService`);
                return {
                    success: false,
                    message: `Show data unsuccessfully, id : ${id} doesn't exist...`
                }
            }
        }catch(e){
            Logger.error(`Show data id : ${id} unsuccessfully... ${Date.now() - now}ms`, `Error : ${e}`, `IdeaService`);
            return {
                success: false,
                message: `Show data id : ${id} unsuccessfully...`,
                error: e
            }
        }
    }

    async update(id: string, data: Partial<IdeaDTO>){
        const now = Date.now();
        
        try{
            const cek = await this.ideaRepository.findOne({id});
            if (cek) {
                await this.ideaRepository.update({id}, data);
                const update = await this.ideaRepository.findOne({id});
                
                Logger.log(`Update data id : ${id} successfully... ${Date.now() - now}ms`, `IdeaService`);
                return {
                    success: true,
                    message: `Update data id : ${id} successfully...`,
                    data: update
                }
            } else {
                Logger.error(`Update data id : ${id} unsuccessfully... ${Date.now() - now}ms`, `Error : ID '${id}' not found...`, `IdeaService`);
                return {
                    success: false,
                    message: `Update data id : ${id} successfully...`,
                    data: null
                }
            }
        }catch(e){
            Logger.error(`Update data id : ${id} unsuccessfully... ${Date.now() - now}ms`, `Error : ${e}`, `IdeaService`);
            return {
                success: false,
                message: `Update data id : ${id} unsuccessfully...`,
                error: e
            }
        }
    }

    async destroy(id: string){
        const now = Date.now();

        try{
            const cek = await this.ideaRepository.query(`SELECT COUNT(id) FROM idea WHERE id = '`+id+`'`);

            if (cek[0].count > 0) {
                await this.ideaRepository.delete({id});
            
                Logger.log(`Delete data id : ${id} successfully... ${Date.now() - now}ms`, `IdeaService`);
                return {
                    success: true,
                    message: `Delete data id : ${id} successfully...`
                }
            } else {
                Logger.error(`Delete data unsuccessfully... ${Date.now() - now}ms`, `ID : ${id} doesn't exist...`, `IdeaService`);
                return {
                    success: false,
                    message: `Delete data unsuccessfully, id : ${id} doesn't exist...`
                }
            }
        }catch(e){
            Logger.error(`Delete data id : ${id} unsuccessfully... ${Date.now() - now}ms`, `Error : ${e}`, `IdeaService`);
            return {
                success: false,
                message: `Delete data id : ${id} unsuccessfully...`,
                error: e
            }
        }
    }
}
