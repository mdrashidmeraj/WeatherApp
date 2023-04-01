import request from "request";

export const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=91b747dc85549e9ac577c484e7e69867&query=${latitude},${longitude}`;
    request({ url: url, json:true}, (error, response) => {
        if(error){
            callback("Unable to connect to weather services", undefined);
        }else if(response.body.error){
            callback("Unable to find location", undefined);
        }
        else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. Current temperature is ${response.body.current.temperature}. It feels like ${response.body.current.feelslike}`);
        }
    })
}

