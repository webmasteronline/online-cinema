import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import {ServeStaticModule} from '@nestjs/serve-static'
import { path } from 'app-root-path';

//serveRoot: '/uploads' - то как мы будем обращатся в целом 
//папка /uploads будет статична 
@Module({
	imports:[ServeStaticModule.forRoot({
		rootPath: `${path}/uploads`,
		serveRoot: '/uploads'
	})],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
