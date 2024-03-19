varying vec2 v_uv;

void main() {
  // gl_Position = vec4(position, 1.0);
  vec3 localSpacePosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
  v_uv = uv;
}