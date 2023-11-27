
export async function loadFonts(urls: string[]) {
const fonts: Record<string, string> = urls.reduce(
  (cur, val) => ({ ...cur, [val.split('/').at(-1).split('.').at(0)]: val }),
  {}
)

  for (const [name, url] of Object.entries(fonts)) {
    let target = new FontFace(name, `url(${url})`)
    const loaded = await target.load()
    document.fonts.add(loaded)
  }
}

