attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
void main() {
  fColor = vColor;
  //gl_Position = vec4(vPosition, 0.0, 1.0); //dideklarasikan satu kali saja
  // p' = p
  // p' = T * p
  mat4 rotasi = mat4(
    cos(theta), -sin(theta), 0.0, +0.5*cos(theta) -0.5,
    sin(theta), cos(theta), 0.0, +0.5*sin(theta),
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * rotasi;

  /*mat4 translasi = mat4(
    1.0, 0.0, 0.0, 0.5, // dx=0.5
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
 gl_Position = vec4(vPosition, 0.0, 1.0) * translasi;
*/
}


