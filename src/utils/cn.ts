export const cn = (...args: Array<string | false | undefined>) => {
  const cns: string[] = []

  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a == null) {
      continue
    }

    if (a !== false) {
      cns.push(a)
    }
  }

  return cns.join(' ')
}
