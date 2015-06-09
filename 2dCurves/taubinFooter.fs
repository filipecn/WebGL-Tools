void main()
{
  float x = point.x;
  float y = point.y;
  float v = F(x,y);
  
  float w = 0.5*(worldSize.x/size.x);
  float h = 0.5*(worldSize.y/size.y);

  vec2 g = vec2((F(x+w,y) - F(x-w,y))/(2.0*w),(F(x,y+h) - F(x,y-h))/(2.0*h));
  vec2 p = vec2(x,y);
  //vec2 g = vec2(dFdx(x),dFdy(y));
  v = v/length(g);
  float W = 2.0*w;
  gl_FragColor = vec4(0.0,0.0,0.0,1.0-smoothstep(-W,W,v));
  if(v > 0.0)
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  else gl_FragColor = vec4(0.0,0.0,1.0,1.0);
}