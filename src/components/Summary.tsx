import findLastIndex from 'lodash/findLastIndex';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Progress,
  Segment,
  Modal,
  Confirm
} from 'semantic-ui-react';
import Settings from './Settings'
import { generatePdf, removeAll } from '../api/actions';
import { plains } from '../api/lib';
import { State } from '../api/store';
import { CardImage } from '../api/types';
import AboutSpotit from './Component/AboutSpotit';

interface Props {
  images: CardImage[];
  plains: typeof plains;
  processing: boolean;
  generatePdf: typeof generatePdf;
  removeAll: typeof removeAll;
}

const Summary: FC<Props> = ({ images, plains, processing, generatePdf, removeAll }) => {
  const count = images.length;

  const i = findLastIndex(plains, ({ symbols }) => count >= symbols);

  const activePlain = plains[i] || null;
  const nextPlain = plains[i + 1] || null;

  const activeProgress = (count / (activePlain || nextPlain).symbols) * 100;
  const nextProgress = nextPlain ? (count / nextPlain.symbols) * 100 : 100;

  const [confirm, setConfirm] = React.useState(false)


  return (
    <Container>
      <Segment textAlign="center" raised>
        {(!images.length) &&
          <Modal
            trigger={<Button color="green" >
              How does it work? - איך זה עובד? לחצו להסבר
            </Button>}
            content={<AboutSpotit />}
          />
        }
        <Progress
          percent={activeProgress}
          attached="top"
          color="blue"
          autoSuccess
        />
        {activePlain && (
          <>
            <Header as="h5" className="instructions">
              You can generate {activePlain.symbols} cards with{' '}
              {activePlain.symbolsPerCard} images per card.
              {count > activePlain.symbols && (
                <Header.Subheader as='h6'>
                  You have uploaded too much images. Last{' '}
                  {count - activePlain.symbols} images will not be used.
                </Header.Subheader>
              )}
            </Header>
            <Button
              size="massive"
              positive
              disabled={processing}
              onClick={() => generatePdf(activePlain.n)}
            >
              <Icon loading={processing} name="file pdf outline" />
              Generate and download PDF file
            </Button>
          </>
        )}

        {activePlain && nextPlain && (
          <Divider horizontal className="padded">
            Or
          </Divider>
        )}

        {nextPlain && (
          <Header as="h5" className="instructions">
            Add {nextPlain.symbols - count} more images to generate{' '}
            {nextPlain.symbols} cards with {nextPlain.symbolsPerCard} images per
            card
          </Header>
        )}


        {images.length > 0 && (
          <>
            <Button onClick={() => setConfirm(true)}>
              <Icon name="trash" />
              Remove all images
            </Button>
            <Settings />
          </>
        )}
        <Confirm open={confirm}
          onCancel={() => setConfirm(false)}
          content='This will remove all photos - כל התמונות הנוכחיות ימחקו'
          onConfirm={() => {
            setConfirm(false)
            removeAll()
          }}
        />
      </Segment>
    </Container>
  );
};

export default connect(
  (state: State) => ({
    images: state.images,
    plains,
    processing: state.processing,
  }),
  { generatePdf, removeAll },
)(Summary);
