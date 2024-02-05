uniform vec3 u_camera;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_progress;

uniform float u_factor;

uniform sampler2D u_mouse;
uniform sampler2D u_diffuse;
uniform vec2 u_textureResolution;

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

float saturateF(float v) {
  return clamp(v, 0.0, 1.0);
}

vec2 getCell(vec2 uv) {
    float gridSize = 50.0;
    return floor(uv * gridSize);
}

void main(void) {
  // vec2 uv = gl_FragCoord.xy / u_resolution; // Normalized UV coordinates
  vec2 uv = v_uv;

  vec2 gridUV = getCell(uv);

  vec2 displacement = vec2(0.01, 0.0); // The displacement for each cell
  vec2 displacedUV = uv - displacement * gridUV; // The displaced UV coordinates

  vec4 texColor = texture2D(u_diffuse, displacedUV); // Sample the texture with the displaced UV coordinates

  gl_FragColor = texColor;
}

