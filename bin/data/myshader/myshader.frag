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
	float fence = 0.5 + sin(u_time + normPos.x * PI * 50) * 0.4 
		* sin(u_time + normPos.x * PI);

	float fenceB = 0.5 + cos(u_time + normPos.x * PI * 50) * 0.4 
		* cos(u_time + normPos.x * PI);

	// Assign the base color (by default a gradient over y)
	//vec3 color = vec3(fence);
	vec3 color = vec3(0.0);

	// Adjust color based o position
	float pct = plot(normPos, fence);
	color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 1.0);

	float pct2 = plot(normPos, fenceB);
	color = (1.0 - pct2) * color + pct2 * vec3(1.0, 0.0, 1.0);



	// Assign final colorn
	outputColor = vec4(color,1.0);

}
