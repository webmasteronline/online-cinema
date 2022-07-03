import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import {MovieModel} from './movie.model'
import { Types } from 'mongoose';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
		private readonly telegramService: TelegramService
	) {}

	

	//получение всех жанров
	//searchTerm - поиск конкретного жанра в админке по email
	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}


		// select убераем лишние поля у Юзера из базы данных -password -updateAt -__v
		return this.MovieModel.find(options)
			.select('-updateAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('actors genres')
			.exec()
	}

//$inc - инкримент добовляет либо убирает  
//{countOpened: 1} - тут означает что к полю countOpened мы будем прибовлять  1
//new: true - опция для того что бы нам вазвращался уже обновленный объект
//если без опции то отправляя первый раз в инсомнии запрос мы получим "countOpened": 0, хотя по факту уже был просмотр мы же отправили запрос
//стаим эту опцию new: true отпрвляем второй запрос и получаем "countOpened": 2
	async updateCountOpened(slug: string) {
		const updateDoc = await this.MovieModel.findOneAndUpdate({slug}, {
			$inc: {countOpened: 1}
		},{
			new: true
		}).exec()
		if(!updateDoc) throw new NotFoundException('Movie not found')

		return updateDoc
	}

//newRating: number - принимает в себя рейтинг который мы будем задавать 
//rating: newRating - должен будет равняться уже новому рейтингу который ми задали 
//new: true и если не было до этого рейтинга у фильма то он создастся новый
	async updateRating(id:Types.ObjectId, newRating: number){
		return this.MovieModel.findByIdAndUpdate(id, {
			rating: newRating
		},{
			new: true
		}).exec()
	}

	//$gt: 0 - оператор MoongoDB 
	//выбераем только те фильмы у которых поле countOpened > 0
	//.sort({countOpened: -1}) - сортирока в обратную сторону 
	async getMostPopular(){
		return this.MovieModel.find({ countOpened: {$gt: 0}}).sort({countOpened: -1}).populate('genres').exec()
	}

	/* Admin place */

	async bySlug(slug:string){
		const doc = await this.MovieModel.findOne({slug}).populate('actors genres').exec()
		if(!doc) throw new NotFoundException('Movie not found')
		return doc
	}

	//если в масстве - actors если хоть один инклудится с actorId он его будет отдавать  
	async byActor(actorId: Types.ObjectId){
		const docs = await this.MovieModel.find({actors: actorId}).exec()
		if(!docs) throw new NotFoundException('Movies not found')
		return docs
	}

	// фронтЕнд требует так чт опо одному атеру щем но по множеству жанров 
	//тоесть мы здесь будем получать объект жанров
	//{$in: genreIds} мы используем когда ищем грубо говоря массив в массиве
	async byGenres(genreIds: Types.ObjectId[]): Promise<DocumentType<MovieModel>[]> {
		return this.MovieModel.find({ genres: { $in: genreIds } }).exec()

	}


	async byId(_id:string){
		const doc = await this.MovieModel.findById(_id)

		if(!doc) throw new NotFoundException('Movie not found')

		return doc

	}


	async create() {
		// создаем пустые поля для нашего Movie при апдейте они уже будут заполнятся 
		//:CreateCreatMovieDto добавили что бы легче было писать поля - теперь они всплывают ка кподсказки .
		const defaultValue: UpdateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			// description: '',
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
		}
		const movie = await this.MovieModel.create(defaultValue)
		return movie._id
	}

	async update(_id: string, dto: UpdateMovieDto) {
		if (!dto.isSendTelegram) {
			await this.sendNotification(dto)
			dto.isSendTelegram = true
		}
		//находи по _id и сразу обновляем 
		//опция new: true обозначает что мы будем возвращатьне старую версию movie а уже обновленную новую 
		const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
			new: true
		}).exec()
		//делаем проверку если мы вставим в запрос левый id нашего movie
		//updateDoc нам вернет null
		//если у нас null то мы пишем что ('Movie not found')
		if(!updateDoc) throw new NotFoundException('Movie not found')

		return updateDoc
	}


	//удаление пользователя
	async delete(id: string) {
	const deleteDoc = await this.MovieModel.findByIdAndDelete(id).exec()
	
	if(!deleteDoc) throw new NotFoundException('Movie not found')

	return deleteDoc
	}

	async sendNotification(dto: UpdateMovieDto){
		//if (process.env.NODE_ENV !== 'development')
		// await this.telegramService.sendPhoto(dto.poster)
		await this.telegramService.sendPhoto('https://morguefile.nyc3.cdn.digitaloceanspaces.com/imageData/public/files/m/middlewick/preview/fldr_2008_11_28/file000615586116.jpg')

		const msg = `<b>${dto.title}</b>`

		await this.telegramService.sendMessage(msg, {
			reply_markup:{
				inline_keyboard:[
					[
						{
							url: 'https://okko.tv/movie/free-guy',
							text: 'Go to watch',
						}
					]
				]
			}
		})
	}

}
