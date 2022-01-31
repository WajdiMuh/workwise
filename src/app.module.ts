import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { article } from './article/article.entity'
import { articletag } from './articletag/articletag.entity'

import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: null,
      database: 'workwise',
      entities: [article,articletag]
    }),
    TypeOrmModule.forFeature([article,articletag])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {constructor(private connection: Connection) {}}

