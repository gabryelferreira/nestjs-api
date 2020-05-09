import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BaseEntity } from "typeorm";
import { Post } from "../posts/post.entity";
import bcryptHelper from "../utils/bcrypt-helper";


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column({ name: "created_at", default: Date.now() })
    createdAt: Date;

    @Column({ name: "updated_at", default: Date.now() })
    updatedAt: Date;

    @BeforeInsert()
    async updatePassword() {
        this.password = await bcryptHelper.hash(this.password);
    }

}