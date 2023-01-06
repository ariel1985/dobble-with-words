import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Icon,
  Form,
  Input,
  Image,
  Segment,
  Label,
  Message,
} from 'semantic-ui-react';

import {
  loadExamples,
  textToImage,
  removeAll,
  removeImage,
  uploadImages,
} from '../api/actions';
import { State } from '../api/store';
import { CardImage } from '../api/types';
import Settings from './Settings';

interface Props {
  images: CardImage[];
  loadExamples: typeof loadExamples;
  textToImage: typeof textToImage;
  removeAll: typeof removeAll;
  removeImage: typeof removeImage;
  uploadImages: typeof uploadImages;
}

const Files: FC<Props> = ({
  images,
  loadExamples,
  textToImage,
  removeAll,
  removeImage,
  uploadImages,
}) => {

  const [inputText, setInputText] = React.useState('')
  const [textError, setTextError] = React.useState('')

  function handleSendText(e) {
    if (!inputText.length) {
      return setTextError('Text input cannot be empty - טקסט לא יכול להיות ריק')
    }
    setTextError('')
    textToImage(inputText)
  }

  return (<Container className="pusher">
    <Divider horizontal>
      <Button.Group size="huge">
        <Button primary as="label" htmlFor="fileUpload">
          <Icon name="cloud upload" />
          Upload images - בחר תמונות
        </Button>
        <Button.Or text="or" />
        <Button onClick={loadExamples}>
          <Icon name="images outline" />
          Load examples - תמונות לדוגמא
        </Button>
      </Button.Group>
    </Divider>

    <Form size='large' style={{ display: 'flex', justifyContent: 'center' }}>
      <Form.Group inline unstackable grouped widths={1}>
        <Form.Field >
          <Button.Or text="or" />
          <Label horizontal htmlFor="text4image">Your Text - מטקסט</Label>
          <Icon name="text cursor" />
          <Input
            type="text"
            id="text4image"
            value={inputText}
            onChange={e => setInputText(e.currentTarget.value)}
            style={{ padding: '.2em', margin: '0 1em' }}
            placeholder="Enter text - הכנס טקסט"
          />
          <Button onClick={handleSendText}>
            <Icon name="images outline" />
            Image From Text - תמונה מטקסט
          </Button>

        </Form.Field>
      </Form.Group>
    </Form>
    {textError && <Message warning>
      {textError}
    </Message>}
    <Input
      type="file"
      id="fileUpload"
      onChange={e => uploadImages(e.target.files)}
      multiple
      style={{ display: 'none' }}
      accept=".png,.jpg,.jpeg"
    />
    <Segment basic textAlign="center">
      <Image.Group size="tiny">
        {images.map(({ id, base64src, title }) => (
          <Image
            key={id}
            src={base64src}
            onClick={() => removeImage(id)}
            className="preview"
            title={title}
            alt={title}
          />
        ))}
      </Image.Group>
      {images.length > 0 && (
        <>
          <Button onClick={removeAll}>
            <Icon name="trash" />
            Remove all images
          </Button>
          <Settings />
        </>
      )}
    </Segment>
  </Container >)
};

export default connect((state: State) => ({ images: state.images }), {
  removeAll,
  loadExamples,
  textToImage,
  uploadImages,
  removeImage,
})(Files);
