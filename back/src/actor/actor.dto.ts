import { IsString } from 'class-validator';

export class ActorDto {
	@IsString()
	name: string

	@IsString()
	slug: string

	@IsString()
	photo: string

}

// для больших проектов создается сучность file c такими полями 
//здесь же мы просто будем использовать одну строку	photo: string
// {
// 	name: string,
// 	url: string,
// 	size: string,
// 	_id: string
// }