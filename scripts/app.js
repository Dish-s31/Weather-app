// do cityForm  
// even though forecast n app are in separate files
// we can use that coz forecast is defined qabove app.js

const cityForm = document.querySelector('form');

// update the ui
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    /* console.log(data);
     const cityDets = data.cityDets;
     const weather = data.weather; */

    // destructure props

    const { cityDets, weather } = data;

    // update details template

    details.innerHTML = `
    
    <h5 class="my-3">
    ${cityDets.EnglishName}
</h5>
<div class="my-3">
    ${weather.WeatherText}
</div>
<div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
</div>
    `;


    // update the night/day &icon images

    let iconSrc = `assets/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (weather.isDayTime) {
        timeSrc = 'assets/day.png';
    } else {
        timeSrc = 'assets/night.png';
    }

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

}

const updateCity = async(city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        // cityDets: cityDets,
        // weather: weather using object shorthand notation as prop n value is same
        cityDets,
        weather
    };
};


cityForm.addEventListener('submit', e => {

    // prevent deault action
    e.preventDefault();

    // get city value

    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city).then(
            data => updateUI(data)
        )
        .catch(err => console.log(err));
});