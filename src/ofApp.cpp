#include "ofApp.h"

void ofApp::setup() {
	shader.load("myshader/myshader"); 
}

void ofApp::update() {}

void ofApp::draw() {

	shader.begin();
	shader.setUniform2f("u_resolution", ofVec2f(ofGetWidth(), ofGetHeight()));
	shader.setUniform2f("u_mousepos", ofVec2f(
		(float) ofGetMouseX() / (float) ofGetWidth(), 
		1.0 - (float) ofGetMouseY() / (float) ofGetHeight()));

	ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
	shader.end();

}
