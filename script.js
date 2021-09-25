let city;

async function charting() {
	
	d3.csv('cities.csv', d=>{
		return {
		...d, // spread operator
		eu: d.eu==='true', // convert to boolean
		population: +d.population,
		x: +d.x,
		y: +d.y,
		}
	}).then(data=>{
		city = data.filter(d => d.eu === true);
		// console.log('cities', city);
		d3.select('.city-count').text("There are " + city.length + " European cities in dataset");

		const width = 700;
		const height = 550;
		const svg = d3.select('.population-plot')
				.append('svg')
				.attr('width', width)
				.attr('height', height)

		svg.selectAll('circle')
			.data(city)
			.enter()
			.append("circle")
			.attr("cx", (d,i) => d.x)
			.attr("cy", (d,i) => d.y)
			.attr("r", function (d,i) {
				if (d.population > 1000000){
					return "8px";
				}
				return "4px";
			}).attr("fill", "blue");
		
		const bigcity = city.filter(city => city.population > 1000000)
		// console.log(bigcity)
		svg.selectAll("text")
			.data(bigcity)
			.enter()
			.append("text")
			.attr("x", (d,i) => d.x)
			.attr("y", (d,i) => d.y)
			.text((d,i) => d.city)
			.attr("text-anchor","middle");
	})

	d3.csv('buildings.csv', d3.autoType).then(data=>{
		// console.log('buildings', data);
		
		buildings = data.sort((a, b) => b.height_m - a.height_m);
		// console.log(buildings)
		const width = 600;
		const height = 600;
		const svg = d3.select('.bar-plot')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
		
		svg.selectAll("rect")
		.data(buildings)
		.enter()
		.append("rect")
		.attr("x", 250)
      	.attr("y", (d, i) => i * (width / buildings.length))
		.attr("width",(d, i) => d.height_px)
		.attr("height", 45)
		.attr("fill", "blue")
		.on("click", function(d, i) {
			// console.log("click!")
			d3.select(".image").attr('src', "img/" + i.image)
			d3.select(".building-name").text(i.building)
			d3.select(".height").text(i.height_m)
			d3.select(".completed").text(i.completed)
			d3.select(".city").text(i.city)
			d3.select(".country").text(i.country)   
			d3.select(".floors").text(i.floors)    
		  });
		
		svg.selectAll("text")
        .data(buildings)
        .enter()
        .append("text")
        .text((d,i) => d.building)
		.attr("x", 0)
        .attr("y", (d, i) => i * (width / buildings.length) + 30)
        .attr("width", 0)
        .attr("height", 0) 
        .attr("text-anchor", "front")

		svg.selectAll("label")
        .data(buildings)
        .enter()
        .append("text")
        .text((d,i) => d.height_m + "m")
		.attr("x", (d, i) => d.height_px + 300)
        .attr("y", (d, i) => i * (width / buildings.length) + 30)
        .attr("width", 0)
        .attr("height", 0) 
        .attr("text-anchor", "end")
      
	})

} 
	
charting()
