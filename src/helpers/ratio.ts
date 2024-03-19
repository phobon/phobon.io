// Simple ratio function given a width and height
export const ratio = (width: number, height: number): [number, number] => {
  const ratioX = width > height ? width / height : 1
  const ratioY = width > height ? 1 : height / width

  return [ratioX, ratioY]
}
