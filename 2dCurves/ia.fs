#define EPS 1.19e-07
#define INF (1.0/0.0)

float UP(float x){
  if(x < 0.0)
    return x*(1.0 - EPS);
  return x*(1.0 + EPS);
}

float DOWN(float x){
  if(x < 0.0)
    return x*(1.0 + EPS);
  return x*(1.0 - EPS);
}

#define Interval vec2

Interval Ineg(Interval x)
{
  return Interval(-x[1],-x[0]);
}

Interval Iadd(Interval x, Interval y)
{
  return Interval(DOWN(x[0] + y[0]), UP(x[1] + y[1]));
}

Interval Ishif(Interval x, float c)
{
  return Interval(DOWN(x[0] + c),UP(x[1] + c));
}

Interval Isub(Interval x, Interval y)
{
  return Interval(DOWN(x[0] - y[1]), UP(x[1] - y[0]));
}

Interval Iscale(Interval x, float c)
{
  if(c > 0.0)
    return Interval(DOWN(c*x[0]), UP(c*x[1]));
  if(c < 0.0)
    return Interval(DOWN(c*x[1]), UP(c*x[0]));
  return Interval(0.0,0.0);
}

Interval Imul(Interval x, Interval y)
{
  float mm=x[0]*y[0];
  float mM=x[0]*y[1];
  float Mm=x[1]*y[0];
  float MM=x[1]*y[1];
  return Interval(
    DOWN(min(min(min(mm,mM),Mm),MM)),
    UP(max(max(max(mm,mM),Mm),MM)));
}

Interval Iinv(Interval x)
{
  return Interval(DOWN(1.0/x[1]), UP(1.0/x[0]));
}

Interval Idiv(Interval x, Interval y)
{
  if(y[0] >= 0.0){
    if(x[0] >= 0.0)
      return Interval(DOWN(x[0]/y[1]),UP(x[1]/y[0]));
    if(x[1] <= 0.0)
      return Interval(DOWN(x[0]/y[0]),UP(x[1]/y[1]));
    return Interval(DOWN(x[0]/y[0]),UP(x[1]/y[0]));
  }
  else if(y[1] <= 0.0){
    if(x[0] >= 0.0)
      return Interval(DOWN(x[1]/y[1]),UP(x[0]/y[0]));
    if(x[1] <= 0.0)
      return Interval(DOWN(x[1]/y[0]),UP(x[0]/y[1]));
    return Interval(DOWN(x[1]/y[1]),UP(x[0]/y[1]));
  }  
  return Interval(-INF,INF);
}

Interval Isqrt(Interval x)
{
  if(x[0] <= 0.0)
    return Interval(0.0, UP(sqrt(x[1])));
  return Interval(DOWN(sqrt(x[0])),UP(sqrt(x[1])));
}

Interval Ilog(Interval x)
{
  if(x[0] <= 0.0)
    return Interval(-INF, UP(log(x[1])));
  return Interval(DOWN(log(x[0])),UP(x[1]));
}

Interval Iexp(Interval x)
{
  return Interval(DOWN(exp(x[0])),UP(exp(x[1])));
}

Interval Isqr(Interval x)
{
  if (x[0]>=0.0)
    return Interval(DOWN(x[0]*x[0]),UP(x[1]*x[1]));
  else if (x[1]<=0.0)
    return Interval(DOWN(x[1]*x[1]),UP(x[0]*x[0]));
  else
    return Interval(0.0,UP(max(x[0]*x[0],x[1]*x[1])));
}

Interval Icube(Interval x)
{
  return Interval(DOWN(x[0]*x[0]*x[0]),UP(x[1]*x[1]*x[1]));
}

Interval Ipow(Interval x, int p){
  if(p == 2)
    return Isqr(x);
  if(p == 3)
    return Icube(x);
  return x;
}