import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; 
import { article } from "../article/article.entity";
//articletag entity to link between articles and their tags
@Entity()
export class articletag{
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    tag:string;

    @ManyToOne(() => article, arc => arc.tags)
    article: article;

    constructor(id:number,tag:string){
        this.id = id;
        this.tag = tag;
    }

}