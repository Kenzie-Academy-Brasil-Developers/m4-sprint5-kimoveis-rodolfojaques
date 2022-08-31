import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";
import { Users } from "./user.entity";

@Entity()
export class Schedules_users_properties {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    date: string

    @Column()
    hour: string

    @ManyToOne(type => Properties, property => property.id)
    propertyId: Properties

    @ManyToOne(type => Users, user => user.id, {eager:true})
    user: Users

}