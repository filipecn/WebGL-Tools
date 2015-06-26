precision mediump float;

varying vec2 texCoord;

uniform sampler2D tex;

uniform vec2 size;

void main() {
  vec2 step = vec2(1.0)/size;
  vec4 sum = vec4(0.0);
  for(int i = -1; i <= 1; i++)
    for(int j = -1; j <= 1; j++)
      sum += texture2D(tex, texCoord + vec2(float(i),float(j))*step);
  sum /= 4.0;
  sum.w = 1.0;
  gl_FragColor = sum;
}