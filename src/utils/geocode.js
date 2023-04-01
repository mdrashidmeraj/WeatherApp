import request from "request";

export const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWRyYXNoaWQiLCJhIjoiY2xhd2ZnbGFpMDB0ZjN3bWZkY29nZGoydiJ9.9aI1MLt5TT_FSmHR95PGTg&limit=1`;
    request({ url: url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(response.body.features.length === 0){
            callback("Unable to find location", undefined);
        }else{
            const lat = response.body.features[0].center[1];
            const lng = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;
            callback(undefined, {
                lat,
                lng,
                location
            });
        }
    })
}
