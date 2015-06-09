attribute vec2 vpos;

varying vec4 posPos;

uniform float FXAA_SUBPIX_SHIFT; // = 1.0/4.0;
uniform float rt_w; // GeeXLab built-in
uniform float rt_h; // GeeXLab built-in

void main(void)
{
  vec2 texCoord = vec2((vpos.x+1.0)*0.5, (vpos.y+1.0)*0.5);
  vec2 rcpFrame = vec2(1.0/rt_w, 1.0/rt_h);
  
  posPos.xy = texCoord;
  posPos.zw = texCoord - (rcpFrame * (0.5 + FXAA_SUBPIX_SHIFT));

  gl_Position = vec4(vpos.x, vpos.y, 0, 1);
}