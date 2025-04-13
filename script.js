async function getWeather({ latitude, longitude }) {
    try {
        const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`

        const response = await fetch(url)
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}

const options = {
    enableHighAccuracy: true,
    maximumAge: Infinity
};

async function success(pos) {
    const { latitude, longitude } = pos.coords;

    const weather = await getWeather(pos.coords);

    console.log("Your current position is:");
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);

    console.log(weather)
    renderWeather(weather)
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function renderWeather(weather) {
    let weatherElement = document.querySelector("#weather")
    weather.properties.timeseries.forEach(timeseries => {
        console.log(timeseries.data.next_1_hours?.details.precipitation_amount)
    });

}

navigator.geolocation.getCurrentPosition(success, error, options);