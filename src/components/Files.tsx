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
  Message,
  Modal,
} from 'semantic-ui-react';

import {
  loadUrls,
  textToImage,
  removeAll,
  removeImage,
  uploadImages,
} from '../api/actions';
import { State } from '../api/store';
import { CardImage } from '../api/types';
import Settings from './Settings';
import Gallery from './Gallery'

const examples = Object.values(
  import.meta.glob('/src/assets/animals/*.png', { eager: true, as: 'url' })
)

interface Props {
  images: CardImage[];
  loadUrls: typeof loadUrls;
  textToImage: typeof textToImage;
  removeAll: typeof removeAll;
  removeImage: typeof removeImage;
  uploadImages: typeof uploadImages;
}

const Files: FC<Props> = ({
  images,
  loadUrls,
  removeAll,
  removeImage,
  textToImage,
  uploadImages,
}) => {

  const [inputText, setInputText] = React.useState('')
  const [textError, setTextError] = React.useState('')


  const [gallery, setGallery] = React.useState(false)

  function toggleGallery() {
    return setGallery((prev) => !prev)
  }

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
        <Modal trigger={
          <Button onClick={toggleGallery}>
            <Icon name="images outline" />
            Image gallery - גלריית תמונות
          </Button>}
          content={<Gallery />}
        />
      </Button.Group>
    </Divider>

    <Form size='large' style={{ display: 'flex', justifyContent: 'center' }}>
      <Form.Group inline unstackable widths={1}>
        <Form.Field >
          <Button.Or text="or" />
          <Input
            type="text"
            id="text4image"
            value={inputText}
            onChange={e => setInputText(e.currentTarget.value)}
            style={{ padding: '.2em', margin: '0 1em' }}
            placeholder="Enter text - הכנס טקסט"
          />
          <Button onClick={handleSendText}>
            <Icon name="text cursor" />
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
    <Segment>

      <Image.Group size="tiny" style={{ padding: '1em' }}>
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
    </Segment>
  </Container >
  )
};

export default connect((state: State) => ({ images: state.images }), {
  removeAll,
  loadUrls,
  textToImage,
  uploadImages,
  removeImage,
})(Files);
