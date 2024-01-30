uniform float u_time;

varying vec2 v_uv;

void main() {
  vec3 localSpacePosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
  v_uv = uv;
}