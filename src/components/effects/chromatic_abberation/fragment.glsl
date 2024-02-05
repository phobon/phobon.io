uniform vec2 u_resolution;
uniform float u_factor;
uniform float u_mixStrength;
uniform vec2 u_amplitude;

uniform sampler2D u_mouse;
uniform sampler2D u_diffuse;

varying vec2 v_uv;

vec3 correctGamma(vec3 color) {
  return pow(color, vec3(1.0 / 2.2));
}

void main(void) {
  vec2 uv = v_uv;

  vec4 baseTexel = texture2D(u_diffuse, uv);
  vec3 baseColor = vec3(1.0);
  baseColor = baseTexel.rgb;

  float mouseMask = texture2D(u_mouse, uv).r;

  float factor = mouseMask * u_factor;

  vec2 amplitude = u_amplitude * -1.0 * factor;

  float red = texture2D(u_diffuse, uv + amplitude * 0.5).r;
  float blue = texture2D(u_diffuse, uv + amplitude * 0.75).g;
  float green = texture2D(u_diffuse, uv + amplitude).b;
  
  vec3 aberrationColor = vec3(red, green, blue);
  vec3 finalColor = mix(baseColor, aberrationColor, factor);

  finalColor.rgb = correctGamma(finalColor.rgb);

  gl_FragColor = vec4(finalColor, 1.0);
}

