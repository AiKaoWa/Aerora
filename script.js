let currentVideoSrc = '';

document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    getWeather(location);
});

document.getElementById('location-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const location = document.getElementById('location-input').value;
        getWeather(location);
    }
});

function fadeOut(element) {
    element.classList.add('hide');
    element.addEventListener('transitionend', function() {
        element.classList.remove('hide');
        element.style.transition = 'none';
    }, { once: true });
}

function fadeIn(element) {
    element.style.transition = 'opacity 1s ease-out';
    element.classList.remove('hide');
}

function getWeather(location) {
    const apiKey = '803665a2fb417dd6fb8b244d389a4db2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('Location not found');
                document.getElementById('weather-info').classList.remove('show'); 
                return;
            }

            const locationName = document.getElementById('location-name');
            const tempValue = document.getElementById('temp-value');
            const weather = document.getElementById('weather');
            const humidity = document.getElementById('humidity');
            const windSpeed = document.getElementById('wind-speed');
            // check css
            fadeOut(locationName);
            fadeOut(tempValue);
            fadeOut(weather);
            fadeOut(humidity);
            fadeOut(windSpeed);

            document.getElementById('location-name').innerText = data.name;
            document.getElementById('temp-value').innerText = `${data.main.temp}°C`;
            document.getElementById('weather').innerText = `${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
                
            const weatherCondition = data.weather[0].main.toLowerCase();
            const locationImage = document.getElementById('location-image');
            const temperatureImage = document.getElementById('temperature-image');
            const video = document.getElementById('background-video');

             fadeIn(locationName);
             fadeIn(tempValue);
             fadeIn(weather);
             fadeIn(humidity);
             fadeIn(windSpeed);

            let newVideoSrc = '';

            switch (weatherCondition) {
                case 'clear':
                    temperatureImage.src = 'images/clear.png'; 
                    newVideoSrc = 'condition/clear.mp4';
                    break;
                case 'rain':
                    temperatureImage.src = 'images/rain.png'; 
                    newVideoSrc = 'condition/rain.mp4'; 
                    break;
                case 'snow':
                    temperatureImage.src = 'images/snow.png';
                    newVideoSrc = 'condition/snow.mp4';
                    break;
                case 'clouds':
                    temperatureImage.src = 'images/cloudy.png';
                    newVideoSrc = 'condition/cloudy.mp4';
                    break;
            }

            if (newVideoSrc !== currentVideoSrc) {
                video.style.opacity = 0; // dont change this

                setTimeout(() => {
                    video.src = newVideoSrc;
                    currentVideoSrc = newVideoSrc;

                    video.style.opacity = 1;
                }, 1000);
            } else {
                video.style.opacity = 1;
            }

            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.classList.add('show');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data.');
            document.getElementById('weather-info').classList.remove('show');
        });
}
