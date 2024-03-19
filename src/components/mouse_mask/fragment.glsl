uniform vec3 u_camera;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform float u_radius;

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

float sdfCircle(vec2 p, float r) {
    return length(p) - r;
}

void main(void) {
  // Aspect ratio
  vec2 a = vec2(u_resolution.x / u_resolution.y, 1.0);

  vec2 uv = (v_uv) - 0.5;
  vec2 mouseUv = uv - (u_mouse) * 0.5;
  mouseUv *= a;

  float c = 1.0 - step(length(mouseUv), u_radius);
  // c = smoothstep(u_radius - 0.1, u_radius + 0.1, length(mouseUv));
  // c = mix(0.0, 1.0, length(mouseUv));
  vec3 color = vec3(c);
  
  gl_FragColor = vec4(color, 1.0);
}

