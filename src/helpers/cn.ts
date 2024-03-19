export const cn = (...args: Array<string | false | undefined>) => {
  const cns = []

  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a == null) {
      continue
    }

    a !== false && cns.push(a)
  }

  return cns.join(' ')
}
