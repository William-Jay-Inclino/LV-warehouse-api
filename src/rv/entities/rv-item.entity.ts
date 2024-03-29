import { Field, ObjectType } from "@nestjs/graphql";
import { Item } from "src/item/entities/item.entity";
import { RV } from "./rv.entity";


@ObjectType()
export class RVItem {

    @Field(() => String)
    id: string;

    @Field(() => String)
    rv_id: string;

    @Field(() => RV)
    rv: RV;
    
    @Field(() => String)
    item_id: string;
    
    @Field(() => Item)
    item: Item;

    @Field(() => Date)
    created_at: Date;
  
    @Field(() => Date)
    updated_at: Date;
    
}