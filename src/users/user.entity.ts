import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Post } from "src/posts/post.entity";


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

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column({ name: "created_at", default: Date.now() })
    createdAt: Date;

    @Column({ name: "updated_at", default: Date.now() })
    updatedAt: Date;

}