import { IVideoElement } from './video.interface';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/*вся логика нашего плеера*/
export const useVideo = () =>{
	//получаем наше видео 
	const videoRef = useRef<IVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	//текущее время видео
	const [currentTime, setCurrentTime] = useState(0)
	//общее время видео 
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)

//будем ориентироватся на videoRef на его дерейшин для того что бы у нас всегда было актуально значение длительности фильма
 
	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if(originalDuration) setVideoTime(originalDuration)
	}, [videoRef.current?.duration])

	//play pause 
	const toggleVideo = useCallback(()=> {
		if(!isPlaying){
			videoRef.current?.play()
			setIsPlaying(true)
		}else{
			videoRef.current?.pause()
			setIsPlaying(false)

		}
	}, [isPlaying])

	/*forward + 10 sec */
	const forward = () => {
		if(videoRef.current) videoRef.current.currentTime += 10
	}

	/*revert - 10 sec */
	const revert = () => {
		if(videoRef.current) videoRef.current.currentTime -= 10
	}

	/*fullScreen */
	const fullScreen = () => {
		const video = videoRef.current

		if(!video) return

		if(video.requestFullscreen){
			video.requestFullscreen()
		}else if (video.msRequestFullscreen){
			video.msRequestFullscreen()
		} else if(video.mozRequestFullScreen){
			video.mozRequestFullScreen()
		}else if(video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen
		}
	}


	/*progressBar */
	//будет срабатывать тольк опри изменении videoTime
	useEffect(()=> {
		const video = videoRef.current
		if(!video) return

		//эта функция бует срабатывать с помощью евентлисенера - слушателя который будет отслеживать изменение времени и если время будет изменяться то будет изменять состояние 
		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100)
		}

		video.addEventListener('timeupdate', updateProgress)

		return ()  => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTime])


	/* hotkey -  ' ', 'f', '->', '<-'   */

	useEffect(() => {

		const handleKeyDown = (e:KeyboardEvent) =>{
			//console.log('отображение кода клавишь', e.key)
			switch (e.key) {
				case 'ArrowRight':
					forward()
					break;
				case 'ArrowLeft':
					revert()
					break;
				case ' ':
					{
					e.preventDefault()// так как на пробел срабатыают и другие функции в браузере отключаем их. в нашем браузере пробел будет только поузить и запускать
					toggleVideo()
					break
				}
				case 'f':
					fullScreen()
					break;
			
				default:
					return;
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {

			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo])

	return useMemo(() => ({ 
		videoRef,
		actions: {
			fullScreen, revert, forward, toggleVideo
		},
		video: {
			isPlaying, currentTime, progress, videoTime
		}
	}), [currentTime, progress, isPlaying, videoTime, toggleVideo])
}