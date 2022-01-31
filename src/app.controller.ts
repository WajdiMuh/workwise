import { Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req ,BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import { article } from './article/article.entity';

//main controller to map api requests to functions
@Controller("articles")
export class AppController {
  constructor(private readonly appService: AppService) {}

  //map the get request to listall service
  @Get("listallarticles")
  async listall(@Query('author') author: string,@Query('tag') tag: string):Promise<article[]>  {
    let result = await this.appService.listall(author,tag);

    if(result.length == 0){
      throw new NotFoundException('no articles found that match the query')
    }

    return result;
  }

  //map the get request to viewarticle service
  @Get("viewarticle/:id")
  async view(@Param('id') id:string):Promise<article>  {
    let result = await this.appService.view(parseInt(id));

    if(!result){
      throw new NotFoundException('article not found')
    }

    return result;
  }

  //map the delete request to deletearticle service
  @Delete("deletearticle/:id")
  async delete(@Param('id') id:string):Promise<string> {
    let result = await this.appService.delete(parseInt(id));

    if(result.affected == 0){
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return "success"
  }

  //map the post request to createarticle service
  @Post("createarticle")
  async create(@Req() req):Promise<string> {
    
    let result = await this.appService.create(new article(undefined,req.body.name,req.body.author,req.body.text,undefined,new Date(req.body.publicationdate),new Date(req.body.expirationdate)));

    return "success"
  }

  //map the put request to editarticle service
  @Put("editarticle/:id")
  async edit(@Req() req,@Param('id') id:string):Promise<string> {
    
    if(req.body.id != undefined){
      throw new BadRequestException('trying to edit id');
    }

    let result = await this.appService.edit(parseInt(id),req);

    if(result.affected == 0){
      throw new HttpException('NOT_MODIFIED', HttpStatus.NOT_MODIFIED);
    }

    return "success"
  }

   //map the post request to addtags service
  @Post("addtags/:id")
  async addtags(@Req() req,@Param('id') id:string):Promise<string> {
    let availabletags:string[] = ["Food","Lifestyle","Programming","Work","Life","Sleep"];

    if(req.body.tags == undefined ){
      throw new BadRequestException('no tags to add or false tag');
    }

    let result = await this.appService.addtags(parseInt(id),req.body.tags);

    return "success"
  }

}
