const request = require('request');

const forecast=(latitude,longitude,callback)=>{
    const url ='https://api.darksky.net/forecast/afe801389902782564527820945d9a80/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callaback('',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
               
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability
            })
        }
    })
}

module.exports=forecast;
