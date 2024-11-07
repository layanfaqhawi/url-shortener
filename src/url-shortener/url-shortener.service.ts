import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Url } from './schemas/url.schema';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import * as shortid from 'shortid';

@Injectable()
export class UrlShortenerService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async findAll() {
    return this.urlModel.find().exec();
  }

  async update(shortUrl: string, updateUrlShortenerDto: UpdateUrlShortenerDto) {
    shortUrl = 'http://localhost:3000/url-shortener/' + shortUrl;
    let result = await this.urlModel.updateOne({ shortUrl }, updateUrlShortenerDto).exec();
    return this.urlModel.findOne({ shortUrl }).exec();
  }

  async remove(shortUrl: string) {
    shortUrl = 'http://localhost:3000/url-shortener/' + shortUrl;
    return this.urlModel.deleteOne({ shortUrl }).exec();
  }

  async createShortUrl(createUrlShortenerDto: CreateUrlShortenerDto) {
    let shortUrl: string = "http://localhost:3000/url-shortener/";
    shortUrl += shortid.generate();
    const url = new this.urlModel({shortUrl, longUrl: createUrlShortenerDto.longUrl, createdAt: new Date(now()), hitCount: 0});
    return url.save();
  }

  async getLongUrl(shortUrl: string) {
    shortUrl = 'http://localhost:3000/url-shortener/' + shortUrl;
    let result = await this.urlModel.findOne({ shortUrl }).exec();
    let url = result ? result.longUrl.toString() : null;
    if (url) {
      result.hitCount += 1;
      result.save();
      return url;
    }
    else return null;
  }
}
