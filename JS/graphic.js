// the graphic settings in svg
var settings = {
  left:20,
  top:20,
  width:400, 
  height:200, 
  padding:50,
  radius:50
};

// Data
var data = [
{age: 24 ,cholesterin: 5.43 },
{age: 60 ,cholesterin: 10.27 },
{age: 28 ,cholesterin: 7.49 },
{age: 30 ,cholesterin: 6.34 },
{age: 52 ,cholesterin: 10.53 },
{age: 52 ,cholesterin: 9 },
{age: 23 ,cholesterin: 4.71 },
{age: 25 ,cholesterin: 7.85 },
{age: 48 ,cholesterin: 11.28 },
{age: 30 ,cholesterin: 6.84 },
{age: 36 ,cholesterin: 10.01 },
{age: 20 ,cholesterin: 4.94 },
{age: 44 ,cholesterin: 9.49 },
{age: 50 ,cholesterin: 8.01 },
{age: 57 ,cholesterin: 11.73 },
{age: 57 ,cholesterin: 10.45 },
{age: 51 ,cholesterin: 9.72 },
{age: 34 ,cholesterin: 5.72 },
{age: 37 ,cholesterin: 7.12 },
{age: 31 ,cholesterin: 7.54 },
];
  
var data2 = [
{age: 24 ,cholesterin: 9.43 },
{age: 60 ,cholesterin: 9.27 },
{age: 28 ,cholesterin: 8.49 },
{age: 30 ,cholesterin: 10.34 },
{age: 52 ,cholesterin: 4.53 },
{age: 52 ,cholesterin: 9 },
{age: 23 ,cholesterin: 6.71 },
{age: 25 ,cholesterin: 10.85 },
{age: 48 ,cholesterin: 5.28 },
{age: 30 ,cholesterin: 4.84 },
{age: 36 ,cholesterin: 9.01 },
{age: 20 ,cholesterin: 10.94 },
{age: 44 ,cholesterin: 7.49 },
{age: 50 ,cholesterin: 9.01 },
{age: 57 ,cholesterin: 10.73 },
{age: 57 ,cholesterin: 6.45 },
{age: 51 ,cholesterin: 11.72 },
{age: 34 ,cholesterin: 5.72 },
{age: 37 ,cholesterin: 11.12 },
{age: 31 ,cholesterin: 6.54 },
];

var xScale;
var yScale;
var myG;

var drawAixs = function(data){

// Get min/max values for x
//var xValues = data.map(function(d) {return d.age;});
//var xMin = d3.min(xValues);
//var xMax = d3.max(xValues);

var xMin = d3.min(data, function(d ){return d.age;});
var xMax = d3.max(data, function(d ){return d.age;});

// Using a function for y
var yMin = d3.min(data, function(d ){return d.cholesterin;});
var yMax = d3.max(data, function(d ){return d.cholesterin;});
  
// Define the xScale
 xScale = d3.scale.linear().domain([xMin-1, xMax+1]).range([0, settings.width - settings.padding]);

// Define the yScale
 yScale = d3.scale.linear().domain([yMin-1, yMax+1]).range([settings.height,0]);

// Axis function
var xAxisFunction = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(4);

// Append axis
var xAxis = d3.select('#my-g').append('g').attr('class', 'axis')
  .attr('transform', 'translate(0,200)')
  .call(xAxisFunction);

// yaxis function
var yAxisFunction = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(4);

// Append axis
var yAxis = d3.select('#my-g').append('g').attr('class', 'axis')
    .attr('transform', 'translate(0,0)')
    .call(yAxisFunction);

};
// Color Scale
var colorScale = d3.scale.category10();

// Write a function that will assign all styles/attributes to your 'circle' elements
 var circleFunction = function(circle) {
	circle.attr('cx',function(d,i){return xScale(d.age);})
        .attr('cy',function(d,i){return yScale(d.cholesterin);})
        .attr('r', function(d,i){return d.cholesterin;})
        .attr('fill',function(d) { return colorScale(d.cholesterin);});
};

var draw = function(){
  myG = d3.select('#my-svg')
  .append('g')
  .attr('id', 'my-g')
  .attr('transform', 'translate(' + settings.padding + ','+ settings.padding + ')');
  
  drawAixs(data);
   // Remove any circle and text elements
   d3.selectAll('circle').data([]).exit().remove();
//draw graphic

var circles = myG.selectAll('circle').data(data);
circles.enter().append('circle').call(circleFunction);

//title
myG.append('text')
.attr('y', settings.top-35)
.attr('x', settings.left)
.attr('font-size',20)
.text('Relation between age and cholesterin');
};
  /* Write a function "update" that does the following:
    - Selects all 'rect' elements and binds data2 as the data
    - Transitions the 'rect' elements to their new position using .call
    - Selects all 'text' elements and binds data2 as the data
    - Transitions the 'rect' elements to their new position using .call
  */
 
 var update=function() {
   //drawAixs(data2);
   d3.selectAll('circle').data(data2).transition(500).call(circleFunction);
 };

//run draw function

draw();
  // Run your update function
//update();
