export interface IVideoPlayer {
	videoSource: string //ссылкана видео файл
	slug: string //для того что бы мы потом после авторизации могли перенаправлять на наше врдео
}

//елемнты видео плеера экстендим от HTMLVideoElement тоесть берем все что есть в HTMLVideoElement и добовляем свое
/*
	msRequestFullscreen?: () => void
	mozRequestFullScreen?: () => void
	webkitRequestFullscreen?: () => void
	для того что бы сработала кнопка на весь экран и TypeScript не писал что этих атребутов не существует 
	*/
export interface IVideoElement extends HTMLVideoElement {
	msRequestFullscreen?: () => void
	mozRequestFullScreen?: () => void
	webkitRequestFullscreen?: () => void
}