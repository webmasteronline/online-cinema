import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from './file.interface'

// folder: string = 'default' если мы не передали назване папки то она будет называтся - default
///files?folder=test в данном случае файл будет сохранен в папку test
//ensureDir - проверяет суцествует папка или нет и если нет то создает ее
//что бы .map был ассинхронный Делаем лайфхак оборачиваем в Promise.all
@Injectable()
export class FileService {
	async saveFiles(
		files: Express.Multer.File[],
		folder = 'default'
	): Promise<FileResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		const res: FileResponse[] = await Promise.all(
			files.map(async (file) => {
				await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
				//то что мы получаем в фронтенде когда файл успешно загружен
				return {
					url: `/uploads/${folder}/${file.originalname}`,
					name: file.originalname,
				}
			})
		)

		return res
	}
}
