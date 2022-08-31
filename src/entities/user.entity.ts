import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer"
import { Schedules_users_properties } from "./schedules_users_properties.entity"

@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column("boolean")
    isAdm: boolean
    
    @Column("boolean")
    isActive: boolean

    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @OneToMany(type => Schedules_users_properties, schedules => schedules.user)
    schedules?: Schedules_users_properties[]

    constructor() {
        if(!this.isActive){
            this.isActive = true
        }
    }
}