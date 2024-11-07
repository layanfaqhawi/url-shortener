import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop({ required: true, unique: true })
  shortUrl: string;

  @Prop({ required: true, unique: true })
  longUrl: string;

  @Prop()
  createdAt: Date;

  @Prop()
  hitCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);