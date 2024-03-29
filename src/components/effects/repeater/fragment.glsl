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

void main(void) {
  vec2 pixelCoords = (v_uv - 0.5) * u_resolution;

  vec2 uv = v_uv;

  float steps = 20.0;
  float displacement = saturateF((floor(uv.x * steps) / steps));
  // displacement += saturateF((floor(uv.y * steps) / steps) - 0.5);
  // float displacement = (floor(uv.x * steps) / steps) - 0.5;

  float mouseMask = texture2D(u_mouse, uv).r;
  vec2 displacedUv = uv - vec2(displacement * u_factor, 0.0);
  vec4 regularColor = texture2D(u_diffuse, uv);
  vec4 displacedColor = texture2D(u_diffuse, displacedUv);

  vec4 finalColor = displacedColor.rrra;
  finalColor = mix(finalColor, regularColor, mouseMask);

  // color = vec3(displacement);
  // color = vec3(mouseMask);
  finalColor.rgb = correctGamma(finalColor.rgb);

  // finalColor.rgb = vec3(mouseMask);
  gl_FragColor = vec4(finalColor);
}

