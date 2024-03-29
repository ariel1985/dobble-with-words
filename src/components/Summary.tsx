import findLastIndex from 'lodash/findLastIndex'
import React, { FC } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Progress,
  Segment,
  Confirm,
} from 'semantic-ui-react'
import Settings from './Settings'
import { generatePdf, removeAll } from '../api/actions'
import { plains } from '../api/lib'
import { State } from '../api/store'
import { CardImage } from '../api/types'

interface Props {
  images: CardImage[]
  plains: typeof plains
  processing: boolean
  generatePdf: typeof generatePdf
  removeAll: typeof removeAll
}

const Summary: FC<Props> = ({ images, plains, processing, generatePdf, removeAll }) => {
  const count = images.length

  const i = findLastIndex(plains, ({ symbols }) => count >= symbols)

  const activePlain = plains[i] || null
  const nextPlain = plains[i + 1] || null

  const activeProgress = (count / (activePlain || nextPlain).symbols) * 100
  const nextProgress = nextPlain ? (count / nextPlain.symbols) * 100 : 100

  const [confirm, setConfirm] = React.useState(false)

  return (
    <Container>
      <Segment textAlign="center" raised>
        <Progress percent={activeProgress} attached="top" color="blue" autoSuccess />
        {activePlain && (
          <>
            <Header as="h5" className="instructions">
              {/* You can generate {activePlain.symbols} cards with {activePlain.symbolsPerCard} images
              per card. */}

              ניתן לייצר {activePlain.symbols} קלפים עם {activePlain.symbolsPerCard} תמונות בכל קלף

              {count > activePlain.symbols && (
                <Header.Subheader as="h6">
                  {/* You have uploaded too much images. Last {count - activePlain.symbols} images will
                  not be used. */}
                  יש יותר מדי תמונות. 
                  ה{count - activePlain.symbols} התמונות האחרונות לא יעלו
                </Header.Subheader>
              )}
            </Header>
            <Button
              id="btn-generate-pdf"
              size="massive"
              positive
              disabled={processing}
              onClick={() => generatePdf(activePlain.n)}
            >
              <Icon loading={processing} name="file pdf outline" />
              {/* Generate and download PDF file -  */}
              ייצר קובץ להדפסת קלפי המשחק
            </Button>
          </>
        )}

        {activePlain && nextPlain && (
          <Divider horizontal className="padded">
            או
          </Divider>
        )}

        {nextPlain && (
          <Header as="h5" className="instructions">
            {/* Add {nextPlain.symbols - count} more images to generate {nextPlain.symbols} cards with{' '}
            {nextPlain.symbolsPerCard} images per card */}

            יש להוסיף {nextPlain.symbols - count} תמונות ליצירת {nextPlain.symbols}  קלפים עם {nextPlain.symbolsPerCard} תמונות לקלף 
          </Header>
        )}

        {images.length > 0 && (
          <>
            {/* <Button onClick={() => setConfirm(true)} id="btn-remove-images">
              <Icon name="trash" />
              Remove all images
            </Button> */}
            <Button onClick={() => setConfirm(true)} id="btn-remove-images">
              <Icon name="trash" />
              הסרת כל התמונות
            </Button>
            <Settings />
          </>
        )}
          {/* content="This will remove all photos - כל התמונות הנוכחיות ימחקו" */}
        <Confirm
          open={confirm}
          onCancel={() => setConfirm(false)}
          content="כל התמונות הנוכחיות ימחקו"
          onConfirm={() => {
            setConfirm(false)
            removeAll()
          }}
        />
      </Segment>
    </Container>
  )
}

export default connect(
  (state: State) => ({
    images: state.images,
    plains,
    processing: state.processing,
  }),
  { generatePdf, removeAll }
)(Summary)
