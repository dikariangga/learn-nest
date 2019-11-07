import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true
    })
    username: string;

    @Column('text')
    password: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = true){
        const {id, username, created_at, token} = this;
        const responseObject: any = {id, username, created_at};

        if (showToken){
            responseObject.token = token;
        }

        return responseObject;
    }

    async comparePassword(attemp: string){
        return await bcrypt.compare(attemp, this.password);
    }

    private get token(){
        const {id, username} = this;
        return jwt.sign({
            id, username
        }, process.env.SECRET, {expiresIn: '1d'})
    }
}