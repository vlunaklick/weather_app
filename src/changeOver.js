export default function(data){
    let countryTit = document.getElementById('country');
    let tempTit = document.getElementById('temperature');
    let descSky = document.getElementById('descSky');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');
    let miniT = document.getElementById('minT');
    let maxT = document.getElementById('maxT');
    let hour = document.getElementById('hour');
    let fecha = document.getElementById('fecha');

    let time = new Date((data.dt) * 1000);

    let body = document.querySelector('body');

    countryTit.innerHTML = `${data.name}, ${mayus((data.sys.country).toLowerCase())}`;
    tempTit.innerHTML = `${Math.round((data.main.temp - 273.15)*10)/10} C°`;
    descSky.innerHTML = `${mayus(data.weather[0].description)}`;
    wind.innerHTML = `${data.wind.speed}k/m`;
    humidity.innerHTML = `${data.main.humidity}%`;
    miniT.innerHTML = `<strong>Min. today:</strong> ${Math.round((data.main.temp_min - 273.15)*10)/10} C°`;
    maxT.innerHTML = `<strong>Max. today:</strong> ${Math.round((data.main.temp_max - 273.15)*10)/10} C°`;
    hour.innerHTML = `${(getLocalTime(data.timezone)).slice(10)}`;
    fecha.innerHTML = `${months[getLocalTime(data.timezone).slice(0,1)]}, ${days[getLocalTime(data.timezone).slice(1,2)]}`;

    if ((getLocalTime(data.timezone)).slice(10,12) > 18){
        body.style.backgroundImage = `url('images/anochecer.jpg')`;
    } else if ((getLocalTime(data.timezone)).slice(10,12) > 12){
        body.style.backgroundImage = `url('images/mediodia.jpg')`;
    } else {
        body.style.backgroundImage = `url('images/amanecer.jpg')`;
    }

    console.log(data)
}

function mayus(cont){
    let ma = cont.slice(0,1)
    ma = ma.toUpperCase()
    let res = cont.slice(1)
    return ma + res
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getLocalTime(data) {
    let date = new Date();
    let time = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = time + localOffset;
    let localTime = utc + 1000 * data;
    let localTimeDate = new Date(localTime);
    return localTimeDate.toLocaleString();
  }