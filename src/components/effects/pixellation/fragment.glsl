uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_diffuse;
uniform sampler2D u_dataTexture;
uniform float u_amplitude;

varying vec2 v_uv;

vec3 correctGamma(vec3 color) {
  return pow(color, vec3(1.0 / 2.2));
}

void main(void) {
  vec4 offsetColor = texture2D(u_dataTexture, v_uv);
  vec2 offsetUv = v_uv - u_amplitude * offsetColor.rg;

  vec4 finalColor = texture2D(u_diffuse, offsetUv);
  finalColor.rgb = correctGamma(finalColor.rgb);

  gl_FragColor = finalColor;
}

