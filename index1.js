const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
	
	
});
app.post("/",function(req,res){
	console.log(req.body.city);
	const city=req.body.city;
	const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=9338201333e76403a3a9a2d1e077d01d&units=metric";
	https.get(url ,function(response){
		console.log(response.statusCode);

		response.on("data",function(data){
			const weatherData=JSON.parse(data);
			const temp=weatherData.main.temp;
			const description=weatherData.weather[0].description
			const icon=weatherData.weather[0].icon
			const imageUrl=" http://openweathermap.org/img/wn/"+ icon +"@2x.png"
			const humidity=weatherData.main.humidity
			const cloudCover=weatherData.clouds.all
			const location=weatherData.name
			const windSpeed=weatherData.wind.speed
	
			res.write("<h1>weather forcast location: "+location+" .<br>weather description: "+description+".<br> Humidity: "+humidity+".<br> temprature: "+temp+".<br> Cloud cover: "+cloudCover+".<br> Wind Speed: "+windSpeed+".</h1>");
            res.write("<img src="+  imageUrl +">");
			res.send();

		});
	});
});



app.listen(3000, function(){
	console.log("my port is running on 3000 server");
});