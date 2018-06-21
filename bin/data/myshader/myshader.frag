#version 150

out vec4 outputColor;

uniform vec2 u_resolution;
uniform vec2 u_mousepos;

void main() {

	vec2 normPos = gl_FragCoord.xy / u_resolution;
	float d = sqrt(pow(normPos.x - u_mousepos.x, 2) + pow(normPos.y - u_mousepos.y, 2));
	outputColor = vec4(1.0, 1.0, 1.0, 1.0 - cos(d));

}
