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
  else{
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    
    
    float subw = w / subpixels;
    float subh = h / subpixels;
    int inside = 0, outside = 0, border = 0;
    const int a = 4;
    for(int i = 0; i < a; i++)
      for(int j = 0; j < a; j++){
        float subx = float(i)*2.0*subw + subw + x - w;
        float suby = float(j)*2.0*subh + subh + y - h;    
        Interval subv = F(subx, suby, subw, subh);
        if(subv[0] > 0.0)
          outside++;
        else if(subv[1] < 0.0)
          inside++;
        else border++;
      }
      
  if (border > 0)
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  else if (inside > 0 && outside > 0)
    gl_FragColor=vec4(1.0,0.0,1.0,1.0);
  else if(inside > 0)
    gl_FragColor=vec4(0.0,0.0,0.0,1.0);
  else 
    gl_FragColor=vec4(1.0,1.0,1.0,1.0);
  }
}