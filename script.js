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
		console.log('cities', data.filter(d => d.eu === true));
		d3.select('.city-count').text("There are" + data.length()+ "european cities")
		const width = 700;
		const height = 550;
		const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
   		.attr('height', height)
	})	
	
} 
	
charting()