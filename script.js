function fetchWeatherData()
{
let apiKey = 'c3ba3feb0d7255df6d7b350831c910aa';
let zip =  document.getElementById("zip").value;
let getLatLongAPIurl = "https://api.openweathermap.org/geo/1.0/zip?zip="+zip+",US&appid="+apiKey+"";
fetch(getLatLongAPIurl)
        .then((response) => response.json())
        .then((LATLONGdata) => 
        {
          let CityName = LATLONGdata.name;
          let Latitude = LATLONGdata.lat;
          let Longitude = LATLONGdata.lon;

          let getWeatherAPIurl = "https://api.openweathermap.org/data/2.5/onecall?lat="+Latitude+"&lon="+Longitude+"&units=imperial&appid="+apiKey+"";

          fetch(getWeatherAPIurl  )
              .then((response) => response.json())
              .then((weatherData) => 
              {
              let current_temp=weatherData.current.temp;
              let current_condition=weatherData.current.weather[0].description;
              let humidity=weatherData.current.humidity;
              let tempMax = weatherData.daily[0].temp.max;
              let tempMin = weatherData.daily[0].temp.min;
              let current_windspeed = weatherData.daily[0].wind_speed;  
              const date = new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})

              document.querySelector(".city").innerText = CityName;
              document.querySelector(".temp").innerText = `${current_temp}°F`;
              document.querySelector(".date").innerText = date;
              document.querySelector(".cond").innerText = current_condition;
              document.querySelector(".wind").innerText = `Current Wind Speed ${current_windspeed}mph`;
              document.querySelector(".humidity").innerText = `Humidity ${humidity}%`;
              document.querySelector(".tempmax").innerText= `High ${tempMax}°F`;
              document.querySelector(".tempmin").innerText=`Low ${tempMin}°F`  ;
              });
    });
  }
