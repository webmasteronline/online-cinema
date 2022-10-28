/** @type {import('next').NextConfig} */
const nextConfig = {
	//reactStrictMode: true,  //строгая типизация много варнингов если устарели библеотеки штука полезная но если только не пользоватся сторонними библиотеками
	poweredByHeader: false, //если кто-то будет пробивать на чем сделаннаш сайт то он не увидет что наш сайт сделан на NextJS.
	optimizeFonts: false, //отключает оптимизацию шрифтов , так как googlFont не хотело подгружать при билде проэкта.
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://localhost:4200/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `http://localhost:4200/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
