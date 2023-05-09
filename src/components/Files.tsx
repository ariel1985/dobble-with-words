import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider, Icon, Input, Image, Segment, Modal } from 'semantic-ui-react'
import { 
  loadExamples, 
  loadUrls, textToImage, 
  removeAll, removeImage, 
  uploadImages
} from '../api/actions'
import { State } from '../api/store'
import { CardImage } from '../api/types'
import Settings from './Settings'
import Gallery from './Gallery'
import TextToImage from './Component/TextToImage'
const examples = Object.values(
  import.meta.glob('/src/assets/animals/*.png', { eager: true, as: 'url' })
)

interface Props {
  images: CardImage[]
  loadExamples: typeof loadExamples;
  loadUrls: typeof loadUrls
  removeAll: typeof removeAll
  removeImage: typeof removeImage
  uploadImages: typeof uploadImages
}

const Files: FC<Props> = ({ images, loadUrls, removeAll, removeImage, uploadImages, loadExamples }) => {
  const [gallery, setGallery] = React.useState(false)
  function toggleGallery() {
    return setGallery((prev) => !prev)
  }
  const animals = Object.values(
    import.meta.glob('/src/assets/animals/*.png', { eager: true, as: 'url' })
  )

  return (
    <Container className="pusher" >
      <Divider horizontal id="pusher-container">
        {/* <Button.Group size="huge" vertical> */}
        <Button.Group size="huge">
          <Button as="label" htmlFor="fileUpload" color="violet" id="btn-upload-images">
            <Icon name="cloud upload" />
            Upload images
          </Button>
          {/* TODO: remove loadExamples */}
          <Button onClick={() => loadUrls(animals)} color="violet" id="btn-load-examples">
            <Icon name="images outline" />
            Load examples
          </Button>
          {/* <Modal
            trigger={
              <Button onClick={toggleGallery} color="violet" id="btn-load-images">
                <Icon name="images outline" />
                Select From Image gallery - גלריית תמונות
              </Button>
            }
            content={<Gallery />}
          /> */}
          <TextToImage />
        </Button.Group>
      </Divider>

      <Input
        type="file"
        id="fileUpload"
        onChange={(e) => uploadImages(e.target.files)}
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
    </Container>
  )
}

export default connect((state: State) => ({ images: state.images }), {
  removeAll,
  loadUrls,
  uploadImages,
  removeImage,
  loadExamples
})(Files)
