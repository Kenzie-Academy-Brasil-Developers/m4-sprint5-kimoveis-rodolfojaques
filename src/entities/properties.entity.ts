import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./category.entity";
import { Schedules_users_properties } from "./schedules_users_properties.entity";

@Entity()
export class Properties {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({type:"boolean", default: false})
    sold: boolean
    
    @Column({type:"decimal",precision:12, scale:2})
    value:number

    @Column("integer")
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Schedules_users_properties, schedules => schedules.propertyId, {eager:true})
    @Exclude()
    schedules?: Schedules_users_properties[]

    @ManyToOne(type=> Categories, categories=> categories.id, {eager:true})
    categoryId?: Categories

    @OneToOne((type)=> Addresses, {eager:true}) 
    @JoinColumn()
    address: Addresses
}