import { Button, Form, Icon, Input } from 'semantic-ui-react'
import { ColorPicker } from './ColorPicker'
import { Suspense, useState } from 'react'
import type { TextImageParams } from '../../api/types'
import { textToImage } from '../../api/actions'
import { connect } from 'react-redux'
interface Props {
  textToImage: typeof textToImage
}

function TextToImage({ textToImage }: Props) {
  const [textToImageState, setTextToImageState] = useState<TextImageParams>({
    text: 'Enter text - הכנס טקסט',
    textColor: '#000000',
    bgColor: '#ffffff',
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

  function toggleColorPicker(type: 'textColor' | 'bgColor') {
    setColorPickerState((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  return (
    <>
      <Form size="large" style={{ display: 'flex', justifyContent: 'center' }}>
        <Form.Group inline unstackable widths={1}>
          <Form.Field>
            <Input
              type="text"
              id="text4image"
              value={textToImageState.text}
              onChange={(e) => handleInputChange({ text: e.currentTarget.value })}
              style={{
                padding: '.2em',
                margin: '0 1em',
              }}
              placeholder="Enter text - הכנס טקסט"
            />
            <Button onClick={handleSendText}>
              <Icon name="text cursor" />
              Image From Text - תמונה מטקסט
            </Button>
            <Suspense>
              <Button
                icon="paint brush"
                onClick={() => toggleColorPicker('textColor')}
                style={{ color: textToImageState.textColor }}
              />
              {colorPickerState.textColor && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 9,
                  }}
                >
                  <ColorPicker
                    id="textColor"
                    onClick={(color, id) => {
                      handleInputChange({ [id]: color })
                    }}
                  />
                </div>
              )}
              <Button
                icon="paint brush"
                style={{ color: textToImageState.bgColor }}
                onClick={() => toggleColorPicker('bgColor')}
              />
              {colorPickerState.bgColor && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 9,
                  }}
                >
                  <ColorPicker
                    id="bgColor"
                    onClick={(color, id) => {
                      handleInputChange({ [id]: color })
                    }}
                  />
                </div>
              )}
            </Suspense>
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
