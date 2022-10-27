import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { CatToyEntity } from './cat-toy.entity'
import { CatHomeEntity } from './cat-home.entity'

export class Fur {
    @Column()
    color: string

    @Column()
    shiny: boolean
}

@Entity()
export class CatEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    age: number | null

    @OneToMany(() => CatToyEntity, (catToy) => catToy.cat)
    toys: CatToyEntity[]

    @OneToOne(() => CatHomeEntity, (catHome) => catHome.cat, { nullable: true })
    @JoinColumn()
    home: CatHomeEntity

    @Column(() => Fur)
    fur: Fur;

    @CreateDateColumn()
    createdAt: string

    @DeleteDateColumn({ nullable: true })
    deletedAt?: string
}
