attribute vec2 vpos;

varying vec2 point;
varying vec2 texCoord;
varying vec2 worldSize;

uniform vec2 offset;
uniform vec2 ratio;
uniform float zoom;

void main()
{
  point = vpos*ratio*zoom + offset;
  worldSize = vec2(abs(vpos.x*ratio.x*zoom)*2.0,abs(vpos.y*ratio.y*zoom)*2.0);
  texCoord.x = (vpos.x+1.0)*0.5;
  texCoord.y = (vpos.y+1.0)*0.5;
  gl_Position = vec4(vpos.x, vpos.y, 0, 1);
}