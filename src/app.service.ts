import {Injectable} from '@nestjs/common';
import {CatEntity} from "./entities/cat.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {faker} from '@faker-js/faker';
import {CatToyEntity} from "./entities/cat-toy.entity";
import {CatHomeEntity} from "./entities/cat-home.entity";
import {FilterOperator, paginate, PaginateQuery} from "nestjs-paginate";

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(CatEntity) private catRepo: Repository<CatEntity>,
        @InjectRepository(CatToyEntity) private catToyRepo: Repository<CatToyEntity>,
        @InjectRepository(CatHomeEntity) private catHomeRepo: Repository<CatHomeEntity>
    ) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    async createCat(): Promise<CatEntity> {
        let cat = this.catRepo.create({
            name: faker.name.fullName(),
            color: faker.color.human(),
            age: faker.datatype.number({min: 0, max: 20}),
            toys: [],
        });

        cat.home = this.catHomeRepo.create({
            name: faker.address.street(),
            cat: cat,
        });


        cat.home = await this.catHomeRepo.save(cat.home);
        await this.catRepo.save(cat);

        cat.toys.push(this.catToyRepo.create({
            name: faker.word.noun(),
            cat: cat,
        }));

        cat.toys = await this.catToyRepo.save(cat.toys);

        return cat;
    }

    listCats(query: PaginateQuery) {
        return paginate(query, this.catRepo, {
            defaultSortBy: [['name', 'ASC']],
            filterableColumns: {age: [FilterOperator.EQ, FilterOperator.LT, FilterOperator.GT]},
            relations: ["home", "toys"],
            searchableColumns: ['name'],
            sortableColumns: ['name', "age", 'color'],
        });
    }
}
