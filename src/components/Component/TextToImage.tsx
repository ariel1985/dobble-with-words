import { Dropdown, Button, Form, Icon, Input, Popup, Message } from 'semantic-ui-react'
import { ColorPicker } from './ColorPicker'
import { useEffect, useState } from 'react'
import type { TextImageParams } from '../../api/types'
import { textToImage } from '../../api/actions'
import { connect } from 'react-redux'
import { Fonts } from './Fonts'
interface Props {
  textToImage: typeof textToImage
}

const fonts = [
  ['Solitreo-Regular', 'סוליטרו'],
  ['Rubik-Regular', 'רוביק'],
  ['Tinos-Regular', 'טינוס'],
]

function TextToImage({ textToImage }: Props) {
  const [textToImageState, setTextToImageState] = useState<TextImageParams>({
    text: '',
    textColor: '#000000',
    bgColor: '#ffffff',
    font: fonts[1][0],
  })

  const [textError, setTextError] = useState('')
  const [colorPickerState, setColorPickerState] = useState({ textColor: false, bgColor: false })

  function handleSendText(e) {
    if (!textToImageState.text.length) {
      return setTextError('Text input cannot be empty - טקסט לא יכול להיות ריק')
    }
    setTextError('')
    textToImage(textToImageState)
  }

  function handleInputChange(newState: Partial<TextImageParams>): void {
    setTextToImageState((prev) => ({ ...prev, ...newState }))
  }

  //TODO reduce all to false before toggling
  function toggleColorPicker(type: 'textColor' | 'bgColor') {
    setColorPickerState((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const [font, setFont] = useState([fonts[1][0]])

  return (
    <>
      <Form size="large" style={{ display: 'flex', justifyContent: 'center' }}>
        <Form.Group inline unstackable widths={1}>
          <Form.Field>

            {/* https://react.semantic-ui.com/elements/input/#variations-action-icon-button - input&button together */}
            <Input
              placeholder="Enter text - הכנס טקסט"
              type="text"
              id="text4image"
              value={textToImageState.text}
              onChange={(e) => handleInputChange({ text: e.currentTarget.value })}
              style={{
                padding: '.2em',
                margin: '0 1em',
              }}
            />
            <Button onClick={handleSendText} id="btn-text-image">
              <Icon name="add circle" />{/* Image From Text - תמונה מטקסט */}
            </Button>
            <Fonts
              font={textToImageState.font}
              setFont={(font) => handleInputChange({ font: font })}
              fonts={fonts}
            />
            <Popup
              position="bottom center"
              open={colorPickerState.textColor}
              trigger={
                <Button
                  icon="paint brush"
                  style={{ color: textToImageState.textColor }}
                  onClick={() => toggleColorPicker('textColor')}
                />
              }
              content={
                <>
                  <h5>Text Color - צבע טקסט</h5>
                  <ColorPicker
                    id="textColor"
                    onClick={(color, id) => {
                      handleInputChange({ [id]: color })
                    }}
                  />
                </>
              }
            />
            <Popup
              position="bottom center"
              open={colorPickerState.bgColor}
              trigger={
                <Button
                  icon="paint brush"
                  style={{ color: textToImageState.bgColor }}
                  onClick={() => toggleColorPicker('bgColor')}
                />
              }
              content={
                <>
                  <h5>Background Color - צבע רקע</h5>
                  <ColorPicker
                    id="bgColor"
                    onClick={(color, id) => {
                      handleInputChange({ [id]: color })
                    }}
                  />
                </>
              }
            />
          </Form.Field>
        </Form.Group>
      </Form>
      {textError && <Message warning>{textError}</Message>}
    </>
  )
}

export default connect(null, {
  textToImage,
})(TextToImage)
