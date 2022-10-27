import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {CatEntity} from "./entities/cat.entity";
import {Paginate, PaginateQuery} from "nestjs-paginate";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cats/add')
  addCat(): Promise<CatEntity> {
    return this.appService.createCat();
  }

  @Get('cats')
  listCats(@Paginate() query: PaginateQuery) {
    return this.appService.listCats(query);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
