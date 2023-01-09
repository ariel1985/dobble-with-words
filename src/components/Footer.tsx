import React from 'react'
import { Modal, Segment, Container } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { State } from '../api/store'
import { CardImage } from '../api/types'

interface Props {
  images: CardImage[]
}

const Footer: FC<Props> = ({ images }) => {
  if (images.length)
    return (
      <>
        By<a href="linkedin.com">Rothem Ariel</a>
      </>
    )
  return (
    <Segment inverted vertical className="footer">
      <Container text textAlign="center">
        Spot it Generator
      </Container>
    </Segment>
  )
}

export default connect((state: State) => ({ images: state.images }))(Footer)
