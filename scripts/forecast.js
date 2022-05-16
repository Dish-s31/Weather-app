// free acnt so one app , n 50 request per day only
// for enpoints go to api references n check location api n check city endpoint

const key = 'AcuhMFslGBcdmrDBLgZZjZCPE9wdz7Sd';

// get cuurent weather info

const getWeather = async(locationId) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationId}?apikey=${key}`;

    const response = await fetch(base + query);

    const data = await response.json();

    return data[0];

}



// get city info
const getCity = async(city) => {

    // base url of api
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    // lots of data so we need first index of array
    return data[0];
};

// async so returns a promise
getCity('manchester')
    .then(data => {
        return getWeather(data.Key);
    }).then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));

// get weather