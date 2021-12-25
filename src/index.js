import changeOver from './changeOver.js'
import './style.css'

let searcher = document.getElementById('searcher')
let labelSearcher = document.getElementById('labelSearcher')

searcher.value = ''

async function searchWeather(country) {
	try {
		const weatherG = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=2fa59fcee881881732ea84b56fe7e565`,
			{ mode: 'cors' }
		)
		const valores = await weatherG.json()
		changeOver(valores)
	} catch {
		alert("That location doesn't exist")
	}
}

searchWeather('Argentina')

searcher.addEventListener('change', function (e) {
	searchWeather(e.target.value)
})

searcher.addEventListener('focus', function (e) {
	labelSearcher.classList.add('moverLugar')
})

searcher.addEventListener('focusout', function (e) {
	if (searcher.value == '') {
		labelSearcher.classList.remove('moverLugar')
	}
})
