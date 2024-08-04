const apiKey = "dfa4ead12e48f65615f6b7df62150583";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = $('.search input');
const searchBtn = $('.search button');
const weatherIcon = $('.weather-icon');

// Clear: Trời quang đãng, không có mấy
// Clouds: Trời có mây, mức độ mây che phủ có thể khác nhau (ít mây, nhiều mây, mây dày)
// Drizzle: Mưa phùn..
// Mist: Sương mù nhẹ, tầm nhìn bị giảm nhưng không quá nghiệm trọng
// Snow: Tuyết, bao gồm cả tuyết rơi nhẹ và tuyết rơi dày
// Rain: Mưa, bao gồm cả mưa nhẹ và mưa lớn

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        $('.error').css('display', 'block');
        $('.weather').css('display', 'none');
    }

    else {
        let data = await response.json();
    
        // console.log(data);

        $('.city').html(data.name)
        $('.temp').html(Math.round(data.main.temp) + "°C")
        $('.humidity').html(data.main.humidity + "%")
        $('.wind').html(data.wind.speed + " km/h")
    
        switch (data.weather[0].main) {
            case "Clouds":
                $(weatherIcon).attr('src', 'images/clouds.png');
                break;
            case "Clear":
                $(weatherIcon).attr('src', 'images/clear.png');
                break;
            case "Drizzle":
                $(weatherIcon).attr('src', 'images/drizzle.png');
                break;
            case "Mist":
                $(weatherIcon).attr('src', 'images/mist.png');
                break;
            case "Snow":
                $(weatherIcon).attr('src', 'images/snow.png');
                break;
            case "Rain":
                $(weatherIcon).attr('src', 'images/rain.png');
                break;
        }
    
        $('.weather').css('display', 'block');
        $('.error').css('display', 'none');

    }
}

// searchBox.value sẽ không hoạt động vì searchBox là một đối tượng jQuery, không phải phần tử DOM thông thường
// sử dụng phương thức .val() của jQuery để lấy giá trị của phần tử đầu vào

$(searchBtn).click(() => {
    checkWeather(searchBox.val());
});

searchBox.keypress((event) => {
    if (event.which == 13) {
        // 13: Mã ASCII của phím Enter
        checkWeather(searchBox.val());
    }
});

