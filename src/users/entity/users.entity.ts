import { Entity, Column,  PrimaryColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryColumn()
    id: number;

    @Column()
    password:string;

    @Column({ unique: true})
    username:string;

    @Column({unique: true})
    email:string;

   
    @Column({ nullable: true })
    resetPasswordToken: string;

    @Column({nullable:true})
    resetPasswordExpires:Date;


}