import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ActorDto } from './actor.dto';
import { ActorModel } from './actor.model';

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
	) {}

	
	async bySlug(slug:string){
		const doc = await this.ActorModel.findOne({slug}).exec()
		if(!doc) throw new NotFoundException('Actor not found')
		return doc
	}

	//получение всех жанров
	//searchTerm - поиск конкретного жанра в админке по email
	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
				],
			}
		// Aggregation
	//$match - Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage. $match uses standard MongoDB queries. For each input document, outputs either one document (a match) or zero documents (no match).
	//осуществили перебор . мы взяли таблицу Movie в нем поле актров - это массив _id foreignField: 'actors' мы перебераем и сравниваем с локальным localField: '_id' из нашей модели(таблицы актеров) ActorModel . Полностью совместили атеров с фильмами по id

	//когда мы все сравнили и записали результаты в поле movies , мы с помощью оператора $size подсчитываем количество фильмов где учавствовал наш actor

	//.project() как и select убирает не нужные поля. Поле movies мы убираем оно нам нужно было толюко для подсчета фильмов. 
		return this.ActorModel.aggregate().match(options).lookup({
			from: 'Movie',
			foreignField: 'actors',
			localField: '_id',
			as: 'movies'
		}).addFields({
			countMovies:{
				$size: '$movies'
			}
		})
		.project({__v: 0,
			updateAt: 0,
			movies: 0
		})
			.sort({ createdAt: -1 })
			.exec()
		// select убераем лишние поля у Юзера из базы данных -password -updateAt -__v
		// return this.ActorModel.find(options)
		// 	.select('-updateAt -__v')
		// 	.sort({ createdAt: 'desc' })
		// 	.exec()
	}


	/* Admin place */
	async byId(_id:string){
		const actor = await this.ActorModel.findById(_id)

		if(!actor) throw new NotFoundException('Actor not found')

		return actor

	}


	async create() {
		// создаем пустые поля для нашего Actor при апдейте они уже будут заполнятся 
		//:CreateActorDto добавили что бы легче было писать поля - теперь они всплывают ка кподсказки .
		const defaultValue:ActorDto = {
			name: '',
			slug: '',
			photo: ''
		}
		const actor = await this.ActorModel.create(defaultValue)
		return actor._id
	}

	async update(_id: string, dto: ActorDto) {
		//находи по _id и сразу обновляем 
		//опция new: true обозначает что мы будем возвращатьне старую версию жанра а уже обновленную новую 
		const updateDoc = await this.ActorModel.findByIdAndUpdate(_id, dto, {
			new: true
		}).exec()
		//делаем проверку если мы вставим в запрос левый id нашего жанра
		//updateDoc нам вернет null
		//если у нас null то мы пишем что ('Actor not found')
		if(!updateDoc) throw new NotFoundException('Actor not found')

		return updateDoc
	}


	//удаление пользователя
	async delete(id: string) {
	const deleteDoc = await this.ActorModel.findByIdAndDelete(id).exec()
	
	if(!deleteDoc) throw new NotFoundException('Actor not found')

	return deleteDoc
	}
	
}
