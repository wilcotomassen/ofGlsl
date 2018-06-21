#version 150

out vec4 outputColor;

uniform vec2 u_resolution;
uniform vec2 u_mousepos;

float plot(vec2 pos, float pct){
	return smoothstep(pct - 0.02, pct, pos.y) -
		smoothstep(pct, pct + 0.02, pos.y);
}

void main() {

	// Get the normalized position of the pixel
	vec2 normPos = gl_FragCoord.xy / u_resolution;

	// Set y to x (creating a diagonal)
	float y = normPos.x;

	// Assign the base color (by default a gradient over y)
	vec3 color = vec3(y);

	// Adjust color based o position
	float pct = plot(normPos, y);
	color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

	// Assign final colorn
	outputColor = vec4(color,1.0);

}
