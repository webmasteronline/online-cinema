import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { MovieService } from 'src/movie/movie.service';
import { SetRatingDto } from './dto/setRating.dto';
import { RatingModel } from './rating.model';

@Injectable()
export class RatingService {
	//private readonly movieService:MovieService - так как нам нужны некоторые сервисы от Movie 
//так же мы ipmport MovieModule в rating.module.ts
	constructor(
		@InjectModel(RatingModel) private readonly RatingModel: ModelType<RatingModel>, private readonly movieService:MovieService
	) {}

	async getMovieValueByUser(movieId: Types.ObjectId, userId: Types.ObjectId){
		//findOne потому что там явно один элемент будет
		//findOne({movieId, userId}) можно было записать еще вот так {movieId:movieId, userId:userId}
		//.select('value') выбираем только value так как другие поля нам не нужны 
		//data => data ? data.value : 0 - если есть data.value отдаем иначе отдаем 0 так как нам нужно именно число елис этого не писать то отдаст нам undefined
		return this.RatingModel.findOne({movieId, userId}).select('value').exec().then(data => data ? data.value : 0)
	}

	async averageRatingByMovie(movieId: Types.ObjectId | string) {
		const ratingsMovie:RatingModel[] = await this.RatingModel.aggregate().match({
			movieId: new Types.ObjectId(movieId)
		}).exec()

		return ratingsMovie.reduce((acc, item) => acc + item.value, 0) / ratingsMovie.length
	}

	async setRating(userId: Types.ObjectId, dto: SetRatingDto){
		const {movieId, value} = dto

		//findOneAndUpdate - если там нет запсиси никакой то он автоматически запишет ее
		//{movieId, userId} - по этим параметрам идет поиск
		//{movieId,userId,value} - здесь мы указываем какие поля мы будем перезаписывать либо будем создавать новые 
		//new: true - что бы вернулись уже обновленные данные 
		//upsert: true,	setDefaultsOnInsert: true для того что бы создалось новая запись если там ее еще не было . в смысле фильму еще не ставили рейтинг 
		const newRating = await this.RatingModel.findOneAndUpdate({movieId, userId},{movieId,userId,value},{
			new: true,
			upsert: true,
			setDefaultsOnInsert: true
		}).exec()

		const averageRating = await this.averageRatingByMovie(movieId)

		await this.movieService.updateRating(movieId, averageRating)

		return newRating
	}
}
