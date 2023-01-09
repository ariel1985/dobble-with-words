import React from 'react'
import { Modal, Segment, Header } from 'semantic-ui-react'
import HeaderComponent from './Component/Header'
import Video from './Component/Video'
const Component = () => (
  <Segment inverted textAlign="center" vertical className="header">
    <HeaderComponent
      icon={{ name: 'smile outline', inverted: true }}
      text="יצירת משחק דאבל (ספוט איט) להדפסה"
    >
      <Header.Subheader content="Dobbble / Spot-it Generator" className="subtitle" />
    </HeaderComponent>
  </Segment>
)

export default Component
