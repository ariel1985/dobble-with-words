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
    <Segment inverted vertical className="footer">
      <Container text textAlign="center">
        {!images.length ? (
          <Modal
            trigger={<Button color="pink">How does it work? - איך זה עובד? לחצו להסבר</Button>}
            content={<AboutSpotit />}
          />
        ) : (
          <div>
            Spot it Generator By Rothem Ariel and{' '}
            <a href="https://yuval.glide.page">Yuval Dikerman</a>
          </div>
        )}
      </Container>
    </Segment>
  )
}

export default connect((state: State) => ({ images: state.images }))(Footer)
