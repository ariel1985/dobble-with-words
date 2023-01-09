import { Container, Header, Icon, Dropdown, Card } from 'semantic-ui-react'
import React, { useState } from 'react'
import { loadUrls } from '../api/actions'
import { connect } from 'react-redux'
import { State } from '../api/store'
import GalleryHeader from './Component/Header'

const animals = Object.values(
  import.meta.glob('/src/assets/animals/*.png', { eager: true, as: 'url' })
)

function Gallery({ isOpen, toggle, loadUrls }) {
  const options = [
    {
      key: 0,
      text: 'Rick and Morty',
      description: 'ריק אנד מורטי',
      value: 'https://rickandmortyapi.com/api/character',
    },
    {
      key: 1,
      text: 'Animals',
      description: 'חיות',
      value: animals,
    },
  ]

  const [url, setUrl] = useState()
  const [images, setImages] = useState([])

  function handleDropdownChange(e, { value }) {
    if (typeof value === 'string') {
      return setUrl((prev) => value)
    } else {
      setUrl(null)
      return setImages(value)
    }
  }

  async function handleFetchFromUrl(url) {
    try {
      const response = await fetch(url)
      return response.json()
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    ;(async () => {
      const data = await handleFetchFromUrl(url)
      const images = data.results.map((i) => i?.image ?? '')
      setImages(images)
    })()
  }, [url])

  return (
    <Container>
      <GalleryHeader
        icon={{ name: 'images' }}
        text="Free pictures to add to your cards - מאגר תמונות לעיצוב הקלפים"
      >
        <Dropdown
          text="Images gallery \ בחירה מהמאגר"
          options={options}
          onChange={handleDropdownChange}
        />
      </GalleryHeader>
      <Container style={{ padding: '2em' }}>
        <p>
          {!!images.length && (
            <Card.Group itemsPerRow={6}>
              {images.map((url) => (
                <Card onClick={() => loadUrls([url])} image={url} raised />
              ))}
            </Card.Group>
          )}
        </p>
      </Container>
    </Container>
  )
}

export default connect((state: State) => ({ images: state.images }), {
  loadUrls,
})(Gallery)
