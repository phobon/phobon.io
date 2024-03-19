uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_diffuse;
uniform sampler2D u_dataTexture;
uniform float u_amplitude;

varying vec2 v_uv;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec3 correctGamma(vec3 color) {
  return pow(color, vec3(1.0 / 2.2));
}

void main(void) {
  float magnitude = texture2D(u_dataTexture, v_uv).r;
  vec4 texel = texture2D(u_diffuse, v_uv);

  float divisions = 64.0;
  vec2 divisionUv = mod(v_uv * divisions, 1.0);

  vec2 center = vec2(0.5, 0.5);
  float d = distance(divisionUv, center);
  
  magnitude *= 0.5;
  float amplitude = 1.0 - step(magnitude, d);
  vec4 finalColor = vec4(texel.rgb, 1.0);
  if (amplitude > 0.0) {
    finalColor.a = 1.0 - amplitude;
  } else {
    finalColor.a = texel.a;
  }

  gl_FragColor = finalColor;
}

