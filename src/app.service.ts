import { Injectable } from '@nestjs/common';
import { article } from './article/article.entity';
import { articletag } from './articletag/articletag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult , Like, Raw} from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(article) private articlerepo: Repository<article>,@InjectRepository(articletag) private articletagrepo: Repository<articletag>){}


  //join tables and filter based on query
  async listall(author:string,tag:string): Promise<article[]> {
    // return await this.articlerepo.find({
    //   select: ['id','name','author','creationdate','publicationdate','expirationdate'],
    //   where: { author:  Like(author ? author : "%"),expirationdate: Raw((alias) => `${alias} > NOW()`)},
    // });
    return await this.articlerepo.createQueryBuilder("article")
    .leftJoinAndSelect("article.tags", "articletag")
    .select(['article.id', 'article.name','article.author','article.creationdate','article.publicationdate','article.expirationdate', 'articletag.tag'])
    .where("article.author like :author and article.expirationdate > now() and articletag.tag like :articletag", { author: author ? author : "%" , articletag: tag ? tag : "%" })
    .getMany();
  }

  //view the article with the specified id
  view(id:number): Promise<article> {
    return this.articlerepo.findOne({id:id});
  }

  //delete the article with the specified id
  delete(id:number): Promise<DeleteResult> {
    return this.articlerepo.delete({id:id});
  }

  //create the article with data in request body
  create(article:article): Promise<InsertResult> {
    return this.articlerepo.insert(article);
  }

  //edit the article with the specified id
  edit(id:number,req): Promise<UpdateResult> {
    return this.articlerepo.update({id:id},req.body);
  }

  //add tags to the article with the specified id
  async addtags(id:number,tags:string[]) {
    let article = await this.articlerepo.findOne({where: {id:id}, relations: ['tags']});
    tags.forEach(tag => {
      article.tags.push(new articletag(undefined,tag))
    });
    return this.articlerepo.save(article);
  }

}
