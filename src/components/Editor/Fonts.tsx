import { Dropdown } from 'semantic-ui-react'

interface Props {
  setFont: (param: string) => void
  font: any
  fonts: Array<any>
}
export function Fonts(props: Props) {
  function handleChange(e, font) {
    return props.setFont(font.style.fontFamily)
  }

  const selectedFontTitle = props.fonts.find((f) => f[0] === props.font)[1]

  return (
    <>
      <p style={{ fontFamily: props.font }}>{selectedFontTitle}</p>
      <Dropdown>
        <Dropdown.Menu>
          {props.fonts.map((font, id) => (
            <Dropdown.Item onClick={handleChange} key={id} style={{ fontFamily: font[0] }}>
              {font[1]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
