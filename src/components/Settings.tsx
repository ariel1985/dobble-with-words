import  { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Modal, Message } from 'semantic-ui-react'
import { AutoForm } from 'uniforms-semantic'

import { setSettings } from '@/api/actions'
import { createBridge } from '@/api/lib'
import { State } from '@/api/store'
import { Settings } from '@/api/types'

const formSchema = createBridge({
  title: 'Settings',
  type: 'object',
  properties: {
    pageWidth: { type: 'integer' },
    pageHeight: { type: 'integer' },
    cardRadius: { type: 'number' },
    symbolMargin: { type: 'number' },
    rotateSymbols: { type: 'boolean' },
  },
})

interface Props {
  settings: Settings
  setSettings: typeof setSettings
}

const SettingsComponent: FC<Props> = ({ settings, setSettings }) => {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      trigger={
        <Button id="btn-print-settings">
          <Icon name="cog" />
          {/* Settings */}
          הגדרות הדפסה
        </Button>
      }
    >
      {/* <Modal.Header>Adjust settings for the print</Modal.Header> */}
      <Modal.Header> התאמת הגדרות הדפסה</Modal.Header>
      <Modal.Content>
        <AutoForm
          schema={formSchema}
          model={settings}
          onSubmit={(model) => {
            setSettings(model)
            setOpen(false)
          }}
        />
        <Message
          success
          header="Tips הערות"
          list={[
            'Page sizes and card radius are in millimeters',
            'Symbol margin is a percentage of a symbol that should be left as a margin between other symbols',
            'If you rotate symbols, the margin value should be negative to allow overlap since rotated symbols are smaller',
            'Experiment and see what fit best for your pictures!',
          ]}
        />
      </Modal.Content>
    </Modal>
  )
}

export default connect((state: State) => ({ settings: state.settings }), {
  setSettings,
})(SettingsComponent)
