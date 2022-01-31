import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"; 
import { articletag } from "../articletag/articletag.entity";
// article entity
@Entity()
export class article{
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name:string;
    @Column()
    author:string;
    @Column()
    text:string;
    @Column()
    creationdate?:Date;
    @Column()
    publicationdate:Date;
    @Column()
    expirationdate:Date;
    @OneToMany(() => articletag, articlet => articlet.article, {
        cascade: true
    })
    tags: articletag[];

    constructor(id:number = undefined,name:string,author:string,text:string,creationdate:Date = undefined,publicationdate:Date,expirationdate:Date){
        this.id = id;
        this.name = name;
        this.author = author;
        this.text = text;
        this.creationdate = creationdate;
        this.publicationdate = publicationdate;
        this.expirationdate = expirationdate;
    }

}