document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cidadeNome = document.querySelector('#cidade_nome').value;

    if (!cidadeNome) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Digite uma cidade.');
        return;
    }

    const apiKey = '3cf381c1c79a4e6ae49de9ebb6ed3da1';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidadeNome)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            document.querySelector("#weather").classList.remove('show');
            showAlert('Cidade não encontrada.');
        }

    } catch (error) {
    if (!navigator.onLine) {
        showAlert('Erro ao buscar dados. Verifique sua conexão.');
    }
}
});

function showInfo(json) {
     showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#titulo').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;

}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}