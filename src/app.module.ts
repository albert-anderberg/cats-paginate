import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CatEntity} from "./entities/cat.entity";
import {CatHomeEntity} from "./entities/cat-home.entity";
import {CatToyEntity} from "./entities/cat-toy.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [CatEntity, CatHomeEntity, CatToyEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CatEntity, CatHomeEntity, CatToyEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
