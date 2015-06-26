attribute vec2 vpos;

varying vec2 texCoord;

uniform vec2 size;

void main()
{
  texCoord.x = (vpos.x+1.0)*0.5;
  texCoord.y = (vpos.y+1.0)*0.5;
  gl_Position = vec4(vpos.x, vpos.y, 0, 1);
}