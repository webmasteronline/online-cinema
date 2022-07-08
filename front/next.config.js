/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,  //строгая типизация много варнингов если устарели библеотеки штука полезная но если только не пользоватся сторонними библиотеками 
	poweredByHeader: false, //если кто-то будет пробивать на чем сделаннаш сайт то он не увидет чт онаш сайт сделан на NextJS.
	optimizeFonts: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
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
