import React from 'react'
import { Modal, Button, Segment, Container } from 'semantic-ui-react'
import AboutSpotit from './Component/AboutSpotit'
import { connect } from 'react-redux'
import { State } from '../api/store'
import { CardImage } from '../api/types'

interface Props {
  images: CardImage[]
}

const Footer: FC<Props> = ({ images }) => {
  return (
    <Segment vertical className="footer">
      <Container text textAlign="center">
        {!images.length ? (
          <Modal
            trigger={<Button color="violet" id="footer-b4">How does it work?</Button>}
            content={<AboutSpotit />}
          />
        ) : (
          <div>
            {/* Shows up after adding a picture */}
            Spot it Generator By Rothem Ariel and{' '}
            <a target="_blank" href="https://yuval.glide.page">
              Yuval Dikerman
            </a>
          </div>
        )}
      </Container>
    </Segment>
  )
}

export default connect((state: State) => ({ images: state.images }))(Footer)
