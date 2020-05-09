import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: User;

    @Column({ nullable: false })
    text: string;

    @Column({ name: "created_at", default: Date.now() })
    createdAt: Date;

    @Column({ name: "updated_at", default: Date.now() })
    updatedAt: Date;

}