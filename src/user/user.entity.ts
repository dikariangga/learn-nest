import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, BeforeInsert, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    user_name: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    user_email: string;

    @Column('varchar')
    user_password: string;

    @Column({
        type: 'jsonb',
        nullable: true
    })
    user_extras: JSON;

    @Column({
        type: 'boolean',
        default: false
    })
    user_active: boolean;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn({
        nullable: true
    })
    updated_at: Timestamp;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    deleted_at: Timestamp;

    @BeforeInsert()
    async hashPassword(){
        this.user_password = await bcrypt.hash(this.user_password, 10);
    }

    toResponseObject(showToken: boolean = true){
        const {user_id, user_name, user_email, user_extras, user_active, created_at, token} = this;
        const responseObject: any = {user_id, user_name, user_email, user_extras, user_active, created_at};

        if (showToken){
            responseObject.token = token;
        }

        return responseObject;
    }

    async comparePassword(attemp: string){
        return await bcrypt.compare(attemp, this.user_password);
    }

    private get token(){
        const {user_id, user_name} = this;
        return jwt.sign({
            user_id, user_name
        }, process.env.SECRET, {expiresIn: '1d'})
    }
}