#version 150

#define STEP_SMOOTH_OFFSET 0.15
#define PI 3.14
#define TWO_PI PI * 2

out vec4 outputColor;

uniform vec2 u_resolution;
uniform vec2 u_mousepos;
uniform float u_time;

float plot(vec2 pos, float pct){
	return smoothstep(pct - STEP_SMOOTH_OFFSET, pct, pos.y) -
		smoothstep(pct, pct + STEP_SMOOTH_OFFSET, pos.y);
}

void main() {

	// Get the normalized position of the pixel
	vec2 normPos = gl_FragCoord.xy / u_resolution;

	// Set y to x (creating a diagonal)
	float fence = 0.5 + sin(normPos.x * TWO_PI) * 0.5;
	//fence = 0.5 + mod(fence, 0.1); // return x modulo of 0.5
	fence = fract(gl_FragCoord.x); // return only the fraction part of a number
	//fence = ceil(fence);  // nearest integer that is greater than or equal to x
	//fence = floor(fence); // nearest integer less than or equal to x
	//fence = sign(fence);  // extract the sign of x
	//fence = abs(fence);   // return the absolute value of x
	//fence = clamp(fence,0.0,1.0); // constrain x to lie between 0.0 and 1.0
	//fence = min(0.0,fence);   // return the lesser of x and 0.0
	//fence = max(0.0,fence);   // return the greater of x and 0.0 

	// Assign the base color (by default a gradient over y)
	vec3 color = vec3(fence);

	// Adjust color based o position
	float pct = plot(normPos, fence);
	color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 1.0);

	// Assign final colorn
	outputColor = vec4(color,1.0);

}
