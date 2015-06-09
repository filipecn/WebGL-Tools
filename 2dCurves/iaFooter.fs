void main()
{
  float x = point.x;
  float y = point.y;
  float w = 0.5*(worldSize.x/size.x);
  float h = 0.5*(worldSize.y/size.y);
  Interval v = F(x,y,w,h);
  if (v[0]>0.0)
    gl_FragColor=vec4(1.0,1.0,1.0,1.0);
  else if (v[1]<0.0)
    gl_FragColor=vec4(0.0,0.0,0.0,1.0);
  else
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
}