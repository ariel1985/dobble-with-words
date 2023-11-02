import  { FC } from 'react'
import { Modal, Button, Segment, Container } from 'semantic-ui-react'
import AboutSpotit from '@/components/Editor/AboutSpotit'
import { connect } from 'react-redux'
import { State } from '@/api/store'
import { CardImage } from '@/api/types'

interface Props {
  images: CardImage[]
}

const Footer: FC<Props> = ({ images }) => {
  return (
    <Segment vertical className="footer">
      <Container text textAlign="center">
        {!images.length ? (
          // <Modal
          //   trigger={<Button color="violet" id="footer-b4">How does it work?</Button>}
          //   content={<AboutSpotit />}
          // />

          <Modal
            trigger={<Button color="violet" id="footer-b4">?איך זה עובד</Button>}
            content={<AboutSpotit />}
          />
        ) : (
          <div className='credits'>
            <h5>Credits</h5>
            This site is not affiliated in any way with Dobble, Spot It!, its creators or distributors.<br />
            Dobble and Spot It! are trademarks of ASMODEE GROUP.<br />
            Example images by <a target="_blank" href="https://icons8.com/">icons8.com</a><br />
            Implemented by <a target="_blank" href="https://www.linkedin.com/in/rothemariel/">Ro Ariel</a> 
            {' '}and{' '}
            <a target="_blank" href="https://yuval.glide.page">
              Yuval Dikerman
            </a><br />
             Based on <a target="_blank" href="https://macrusher.github.io/dobble-generator/">Dobble Generator</a> by <a target="_blank" href="https://github.com/MacRusher">MacRusher</a>
          </div>
        )}
      </Container>
    </Segment>
  )
}

export default connect((state: State) => ({ images: state.images }))(Footer)
