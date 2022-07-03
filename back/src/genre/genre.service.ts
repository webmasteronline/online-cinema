import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import e from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { MovieService } from 'src/movie/movie.service';
import { CreateGenreDto } from './dto/createGenre.dto';
import { ICollection } from './genre.interface';
import { GenreModel } from './genre.model';

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
		private readonly movieService: MovieService
	){}

	async bySlug(slug:string){
		const doc = await this.GenreModel.findOne({slug}).exec()
		if(!doc) throw new NotFoundException('Genre not found')
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
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		// select убераем лишние поля у Юзера из базы данных -password -updateAt -__v
		return this.GenreModel.find(options)
			.select('-updateAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async getCollections(): Promise<ICollection[]>{
		const genres = await this.getAll()

		const collections = await Promise.all(genres.map(async genre => {
			const moviesByGenre = await this.movieService.byGenres([genre._id])

			if(moviesByGenre.length ==0) return null

			const result:ICollection = {
				_id: String(genre._id),
				title: genre.name,
				slug: genre.slug,
				image: moviesByGenre[0].bigPoster,
			}
			return result
		}))

		return collections.filter(el => el !== null)
	}

	/* Admin place */
	async byId(_id:string){
		const genre = await this.GenreModel.findById(_id)

		if(!genre) throw new NotFoundException('Genre not found')

		return genre

	}


	// получение количества всех жанров
	async getCount() {
		return this.GenreModel.find().count().exec()
	}

	async create() {
		// создаем пустые поля для нашего жанра при апдейте они уже будут заполнятся 
		//:CreateGenreDto добавили что бы легче было писать поля - теперь они всплывают ка кподсказки .
		const defaultValue:CreateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: ''
		}
		const genre = await this.GenreModel.create(defaultValue)
		return genre._id
	}

	async update(_id: string, dto: CreateGenreDto) {
		//находи по _id и сразу обновляем 
		//опция new: true обозначает что мы будем возвращатьне старую версию жанра а уже обновленную новую 
		const updateDoc = await this.GenreModel.findByIdAndUpdate(_id, dto, {
			new: true
		}).exec()
		//делаем проверку если мы вставим в запрос левый id нашего жанра
		//updateDoc нам вернет null
		//если у нас null то мы пишем что ('Genre not found')
		if(!updateDoc) throw new NotFoundException('Genre not found')

		return updateDoc
	}


	//удаление пользователя
	async delete(id: string) {
	const deleteDoc = await this.GenreModel.findByIdAndDelete(id).exec()
	
	if(!deleteDoc) throw new NotFoundException('Genre not found')

	return deleteDoc
	}
}
