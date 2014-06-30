var circle = function(r){
	 
	 /*defines the logic*/
	 function radius_squared(){
	 	return Math.pow(r, 2);
	 }

	 function area(){
	 	return Math.PI * radius_squared();
	 }

	 /*exposes the logic (as public functions)*/
	 return{
	 	area:area
	 };
}

module.exports = circle;