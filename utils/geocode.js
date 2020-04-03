const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXF1aW5hIiwiYSI6ImNrOGZxcDBmOTA1cXMzbXBiN2x3cm9nZXkifQ.yCiEcCT6JqgKamxSVGOd3Q&limit=1';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('',undefined);
        }
        else if (body.features.length == 0) {
            callback('Unable to find location. Try another search',undefined);
        }
        else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].text
            })
        }
    })
}
module.exports=geocode;