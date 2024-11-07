import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import { Response } from 'express';


@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  create(@Body() createUrlShortenerDto: CreateUrlShortenerDto) {
    return this.urlShortenerService.createShortUrl(createUrlShortenerDto);
  }

  @Get()
  findAll() {
    return this.urlShortenerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const url = this.urlShortenerService.getLongUrl(id);
    url.then((url) => {
      if (url)
        res.redirect(url);
      else 
        res.status(404).send("URL not found");
    });

  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlShortenerDto: UpdateUrlShortenerDto) {
    return this.urlShortenerService.update(id, updateUrlShortenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlShortenerService.remove(id);
  }
}
