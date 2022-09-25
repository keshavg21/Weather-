// fetch('https://api.openweathermap.org/data/2.5/weather?q=london&appid=0168ca19c92ec3c5b066743515f6db93')
//     .then(res => res.json())
//     .then(data => console.log(data))
async function getWeatherInfo(){
    const placeName = document.getElementById("placeNameGet").value;
    const hours = document.getElementById("hoursGet").value;
    if(hours > 120 || hours < 1){
        alert("Please enter value b/w 1 and 120");
        return;
    }
    if(!placeName){
        alert("Please enter a Place Name");
        return;
    }
    // console.log(placeName)
    const endpoint = new URL(`https://api.openweathermap.org/data/2.5/forecast?q=${placeName}`);
    // endpoint.searchParams.set("q", "+placeName+");
    endpoint.searchParams.set("appid", "0168ca19c92ec3c5b066743515f6db93");
    // console.log(endpoint)
    const response = await fetch(endpoint, {
       
    });
    if(response.status === 404){
        alert("Place Not Found");
        return ;
    }
    const data = await response.json();
    console.log(data)
    // console.log(data.coord.lon)

    //In the 5 day / 3 hour API we are having List of Size 40
    // (Each day has 8(24/3) and for 5 days we got 5*8 = 40 fields)


    const val = [Math.ceil(hours/3)-1];
    const temp1 = data.list[0].main.temp;
    const temp2 = data.list[val].main.temp;
    let val1, val2;
    // console.log(temp1);
    if(temp1 < temp2){
        val1 = "WARM";
        console.log(val1);
    }
    else if(temp1 > temp2){
        val1 = "COLD";
        console.log(val1);
    }
    else if(temp1 === temp2){
        val1 = "SAME";
        console.log(val1);
    }


    // console.log(data.list[0].weather[0].main);
    let val3 = data.list[0].weather[0].main;
    console.log(val);

    if(data.list[val].weather[0].main === "Clouds"){
        console.log("Steady Red");
        val2 = "Steady Red(Cloudy)";
    }
    else if(data.list[val].weather[0].main === "Clear"){
        console.log("Steady Green");
        val2 = "Steady Green(Clear)";
    }
    else if(data.list[val].weather[0].main === "Rain"){
        console.log("Flashing Red");
        val2 = "Flashing Red(Rainy)";
    }
    else if(data.list[val].weather[0].main === "Snow"){
        console.log("Flashing White");
        val2 = "Flashing White(Snow)";
    }
    alert(`Weather in the next ${hours} hours will be : ${val1}\nWeather currently is : ${val3}\nWeather will be : ${val2}`);
}
