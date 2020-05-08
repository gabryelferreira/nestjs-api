import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from 'class-validator';


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    name: string;

    @Column({ nullable: false, unique: true })
    @IsNotEmpty()
    username: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    password: string;

}