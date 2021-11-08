
const form = document.getElementById('search');
const enterCity = document.getElementById('enter-city'); 
const errorText = document.getElementById('error-text');
const locat = document.getElementById('location'); 
const image = document.getElementById('image'); 
const temperature = document.getElementById('temperature');
const dayTime = document.getElementById('day-time'); 
const graph = document.getElementById('graph'); 
const weeklyWeather = document.getElementById('weekly-weather'); 
const description = document.getElementById('description');
const additionalInfo = document.getElementById('additional-info'); 

const icon = {
     1000 : {
        day : "wi-day-sunny",
        night : "wi-night-clear"
     },

     1003 : {
         day: "wi-day-cloudy",
         night: "wi-night-clear"
     },

     1006 : {
        day : "wi-cloudy",
        night : "wi-cloudy"
     },

     1009 : {
        day : "wi-cloudy",
        night : "wi-cloudy"
     },

     1030 : {
         day: "wi-fog",
         night: "wi-fog"
     },
     1063 : {
        day : "wi-night-rain-wind",
        night : "wi-night-alt-sprinkle"
     },
     1066 : {
        day : "wi-day-snow",
        night : "wi-night-alt-snow"
     },
     1069 : {
        day : "wi-day-sleet",
        night : "wi-night-alt-sleet"
     },
     1072 : {
        day : "wi-hail",
        night : "wi-hail"
     },

     1087 : {
        day : "wi-thunderstorm",
        night : "wi-thunderstorm"
     },
     
     1114 : {
        day : "wi-day-snow-wind wi-strong-wind",
        night : "wi-night-alt-snow-wind wi-strong-wind"
     },
     
      1117: {
        day : "wi-sandstorm",
        night : "wi-sandstorm"
     },

     1135 : {
        day : "wi-day-fog",
        night : "wi-night-fog"
     },
     
      1147: {
        day : "wi-snowflake-cold wi-fog",
        night : "wi-snowflake-cold wi-fog"
     },

     1150 : {
        day : "wi-sprinkle",
        night : "wi-sprinkle"
     },
     1153 : {
        day : "wi-sprinkle",
        night : "wi-sprinkle"
     },

     1168 : {
        day : "wi-snow-wind wi-snowflake-cold",
        night : "wi-snow-wind wi-snowflake-cold"
     },

     1171 : {
        day : "wi-snow-wind wi-snowflake-cold",
        night : "wi-snow-wind wi-snowflake-cold"
     },
     
     1180 : {
        day : "wi-sprinkle",
        night : "wi-sprinkle"
     },

     1183 : {
        day : "wi-rain",
        night : "wi-rain"
     },
     
     1186 : {
        day : "wi-cloudy",
        night : "wi-cloudy"
     },

     1189 : {
        day : "wi-showers",
        night : "wi-showers"
     },

     1192 : {
        day : "wi-rain-mix",
        night : "wi-rain-mix"
     },

     1195 : {
        day : "wi-storm-showers",
        night : "wi-storm-showers"
     },

      1198: {
        day : "wi-rain wi-snowflake-cold",
        night : "wi-rain wi-snowflake-cold"
     },

     1201: {
        day : "wi-snow",
        night : "wi-snow"
     },

     1204: {
        day : "wi-sleet",
        night : "wi-sleet"
     },

     1207: {
        day : "wi-sleet",
        night : "wi-sleet"
     },

     1210: {
        day : "wi-snow",
        night : "wi-snow"
     },

     1213: {
        day : "wi-snow",
        night : "wi-snow"
     },

     1216: {
        day : "wi-snow",
        night : "wi-snow"
     },
     
     1219: {
        day : "wi-snow",
        night : "wi-snow"
     },
     
     1222: {
        day : "wi-snow",
        night : "wi-snow"
     },

     1225: {
        day : "wi-snow",
        night : "wi-snow"
     },

     1237: {
        day : "wi-hail",
        night : "wi-hail"
     },

     1240 : {
        day : "wi-sprinkle",
        night : "wi-sprinkle"
     },
     
     1243: {
        day : "wi-showers",
        night : "wi-showers"
     },
     
     1246: {
        day : "wi-showers",
        night : "wi-showers"
     },

     1249 : {
        day:"wi-sleet",
        night:"wi-sleet"
     },
     
     1252: {
        day:"wi-sleet",
        night:"wi-sleet"
    },

    1255: {
        day:"wi-snow",
        night:"wi-snow"
    },
    
    1258 : {
        day:"wi-snow",
        night:"wi-snow"
    },
    
    1261 : {
        day:"wi-snow",
        night:"wi-snow"
    },

    1264: {
        day:"wi-snow",
        night:"wi-snow"
    },

    1273: {
        day:"wi-thunderstorm",
        night:"wi-thunderstorm"
    },

    1276: {
        day:"wi-thunderstorm",
        night:"wi-thunderstorm"
    },

    1279: {
        day:"wi-storm-showers wi-snowflake-cold ",
        night:"wi-storm-showers wi-snowflake-cold"
    },


    1282: {
        day:"wi-storm-showers wi-snowflake-cold",
        night:"wi-storm-showers wi-snowflake-cold"
    },
}


function convert(input) {
    return moment(input, 'HH:mm:ss').format('h:mm:ss A');
}


// returns day of the week based of the date using Date() obj
// date param is in [xx,xx,xxxx] month,date,year format starting with 0 for single digit months
function returnDay(date){

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

    const days = ["Sunday","Monday","Tuesday","Wendnesday","Thursday","Friday","Saturday"];

    // date is in [xx,xx,xxxx] month,date,year format starting with 0 for single digit months
    
   return days[new Date(date[2],date[0] - 1,date[1]).getDay()];

}

// retrieves icon based of api response icon code
// checks if its day or night to return correct icon
function retrieveIcon(currentWeather){

   let iconCode = currentWeather.forecast.forecastday[0].day.condition.code;

   return (currentWeather.current.is_day == 1) ? icon[iconCode].day : icon[iconCode].night;

}

function displayAdditionalInfo(weather){

   additionalInfo.innerHTML = 
   `
      <div class = "humidity">
         <div class = "hum">Humidity: ${weather.avghumidity}</div>
         <i class="wi wi-humidity"></i>
      </div>

      <div class = "chance-of-rain">
         <div class = "chance">Chance of rain: ${weather.daily_chance_of_rain} %</div>
         <i class="wi wi-raindrops"></i>
      </div>

      <div class = "wind-speed">
         <div class = "ws">Wind speed: ${weather.maxwind_mph} mph</div>
         <i class="wi wi-strong-wind"></i>
      </div>
   `
}


function displayWeek(weather){

   
   const days = weather.forecast.forecastday;
   for (let i = 0; i < days.length; i++){

      
      const temp = document.createElement("div"); 
      temp.classList.add('day-of-week'); 
      temp.setAttribute('id',`${i}`);

      temp.innerHTML = 
      `
         <div class = "wi week-icon ${retrieveIcon(weather)}"></div>
         <div class = "weekday-name">${returnDay(convertDate(days[i].date.split("-")))}</div>
         <div class = "week-max"> ${days[i].day.maxtemp_f}\xB0</div>
         <div class = "week-min"> ${days[i].day.mintemp_f}\xB0</div>
      `

      temp.addEventListener("click",e =>{


            const weekDay = e.target.closest('.day-of-week');
            const date = returnDay(convertDate(days[+weekDay.id].date.split("-")));
            dayTime.innerText = date;

         temperature.innerHTML = 
         `
            <div class = "current-temp"> ${days[+weekDay.id].day.maxtemp_f} \xB0F </div>
               
            <div class = max-min-container>
               <div class = "max-temp"> Max : ${days[+weekDay.id].day.maxtemp_f} \xB0F</div>
               <div class = "min-temp"> Min : ${days[+weekDay.id].day.mintemp_f} \xB0F </div>
            </div>
         `
         description.innerText = days[+weekDay.id].day.condition.text;

         displayAdditionalInfo(days[+weekDay.id].day);
      });
   
      weeklyWeather.appendChild(temp);
   }

}

function convertDate(date){
   return [date[1],date[2],date[0]]; 
}

function displayWeather(currentWeather){
    console.log(currentWeather);

    // formats date from european format to US format
    const info = currentWeather.location.localtime.split(" ");
    const date = convertDate(info[0].split("-"));
    const time = convert(info[1]);

    locat.innerText = currentWeather.location.name + " , " + currentWeather.location.region;

    image.innerHTML = `<i class="wi icon ${retrieveIcon(currentWeather)} "></i>`
    description.innerText = currentWeather.forecast.forecastday[0].day.condition.text;

    // displays current temp and max/min for the day
    temperature.innerHTML = 
    `
        <div class = "current-temp"> ${currentWeather.current.temp_f + " \xB0F"} </div>
      <div class = "max-min-container">
        <div class = "max-temp"> Max : ${currentWeather.forecast.forecastday[0].day.maxtemp_f} \xB0</div>
        <div class = "min-temp"> Min : ${currentWeather.forecast.forecastday[0].day.mintemp_f} \xB0 </div>
      </div>
    `
    dayTime.innerText = returnDay(date) + " " + time; 

    displayAdditionalInfo(currentWeather.forecast.forecastday[0].day);

    displayWeek(currentWeather);
    
}

function checkInput(currentWeather){
    if (currentWeather.hasOwnProperty('error')){
        enterCity.classList.add('error');
        errorText.innerText = currentWeather.error.message;
        errorText.classList.add('show-text'); 
        
        return true;
    }

    return false;
}

async function getCurrentWeather(e){
    e.preventDefault();
    weeklyWeather.innerHTML = ''

    const apiResponse = fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f9e7ad288bf4497a8221143210608&q=${enterCity.value}&days=5&aqi=no&alerts=no`).then(res => res.json());

    // holds weather info. code below extracts info for other parts
    const currentWeather = await apiResponse;

    // outline input if api does not find location
    if (checkInput(currentWeather))
        return;

    // remove error text and red outline
    errorText.innerText = '';
    enterCity.classList.remove('error'); 
    errorText.classList.remove('show-text');

    displayWeather(currentWeather);
}

form.addEventListener('submit',getCurrentWeather);

