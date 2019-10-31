import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

@Entity('idea')
export class IdeaEntity{
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column('text')
    idea: String;

    @Column('text')
    description: String;

    @CreateDateColumn()
    created: Date;
}