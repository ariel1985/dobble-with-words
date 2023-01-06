import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Icon,
  Image,
  Segment,
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
  const [textInput, setTextInput] = React.useState('');
  React.useLayoutEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    canvas.width = 200;
    canvas.height = 50;
    canvas.style.display = 'none';
    canvas.style.position = 'absolute';
    canvas.style.border = '1px solid';

    const img = document.createElement('img');
  });

  return (
    <Container className="pusher">
      {/* <canvas
        id="myCanvas"
        style={{ width: '200px', height: '50px', border: '2px solid' }}
      >
        you aint got no js support
      </canvas> */}
      <Divider horizontal>
        <Button.Group size="huge">
          <Button primary as="label" htmlFor="fileUpload">
            <Icon name="cloud upload" />
            Upload images - עליית התמונות
          </Button>
          <Button.Or text="or" />
          <Button onClick={loadExamples}>
            <Icon name="images outline" />
            Load examples - עליית הדוגמאות
          </Button>
          <Button.Or text="or" />
          <Button onClick={loadExamples}>
            <Icon name="images outline" />
            Load images from text
          </Button>
        </Button.Group>
      </Divider>
      {/* this is a comment */}
      Thau shall not have space here &nbsp;&nbsp;
      <input
        type="text"
        id="text4image"
        style={{ padding: '.2em', margin: '0 1em' }}
        onKeyUp={e => {
          // if (e.keyCode === 13) {}
          setTextInput(e.currentTarget.value);
          // uploadImages(e.currentTarget.value)
        }}
      />
      <Button onClick={() => textToImage(textInput)}>Submit</Button>
      <input
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
    </Container>
  );
};

export default connect((state: State) => ({ images: state.images }), {
  removeAll,
  loadExamples,
  textToImage,
  uploadImages,
  removeImage,
})(Files);
