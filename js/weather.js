const weather = document.querySelector(".js-weather");

const API_KEY = "c54e2c2778cc37bd158d572cb24709b1";
const COORDS = 'coords';

// 날씨 데이터를 얻는 함수(call API)
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){ 
        return response.json();
    })
    .then(function(json){ 
        const temperature = json.main.temp; 
        const place = json.name; 
        weather.innerText = `${temperature} @ ${place}`; 
    });
}

// 좌표(위도, 경도) 저장
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(GeolocationPosition){
    const latitude = GeolocationPosition.coords.latitude;
    const longitude = GeolocationPosition.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

// 좌표를 요청하는 함수
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();