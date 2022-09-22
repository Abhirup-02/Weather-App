let app_wrap = document.querySelector('.app-wrap')
let city = document.querySelector('.location .city')
let date = document.querySelector('.location .date')
let temp = document.querySelector('.current .temp')
let weather_el = document.querySelector('.current .weather')
let hilow = document.querySelector('.hi-low')

const api = {
    key: "150740df546d39e577ffd82527b393a8",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box')
searchbox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getResults(searchbox.value)
    }
})

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json()
        }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather)
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    date.innerText = dateBuilder(now)

    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`


    //Give background image based on weather type
    document.body.style.backgroundSize = '100% 100%'
    switch (weather.weather[0].main) {
        case "Haze":
            weather_el.innerText = weather.weather[0].description
            document.body.style.backgroundImage = "url('./Images/haze.webp')"
            break
        
        case "Drizzle":
        case "Rain":
            weather_el.innerText = weather.weather[0].description
            document.body.style.backgroundImage = "url('./Images/rain.webp')"
            break
        
        case "Clouds":
            weather_el.innerText = weather.weather[0].description
            document.body.style.backgroundImage = "url('./Images/clouds.webp')"
            break
        
        case "Mist":
            weather_el.innerText = weather.weather[0].description
            document.body.style.backgroundImage = "url('./Images/mist.webp')"
            break

        case "Fog":
            weather_el.innerText = weather.weather[0].description
            document.body.style.backgroundImage = "url('./Images/fog.webp')"
            break
        
        case "Clear":
            weather_el.innerText = weather.weather[0].description
            document.body.style.backgroundImage = "url('./Images/clear.webp')"
            document.body.style.backgroundPositionY = '20%'
            document.body.style.backgroundSize = null
            break
        
        default:
            weather_el.innerText = weather.weather[0].description
            document.body.style.backgroundImage = "url('./Images/bg.webp')"
            document.body.style.backgroundSize = 'cover'
    }
    if (weather.weather[0].main != 'Clear') {
        document.body.style.backgroundPositionY = null
    }
    
    hilow.innerText = `↿ ${Math.round(weather.main.temp_max)}°C\u00A0\u00A0\u00A0⇃ ${Math.round(weather.main.temp_min)}°C`

    document.querySelector('#w-icon').src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    // Create divs for another items
    // app_wrap.innerHTML = 

}


function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
