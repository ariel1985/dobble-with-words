import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

const HeaderComponent = () => (
  <Segment inverted textAlign="center" vertical className="header">
    <Container text>
      <Header
        as="h1"
        content="יצירת משחק דאבל (ספוט איט) להדפסה"
        inverted
        className="title"
      />
      <Header.Subheader
        content="Dobbble / Spot-it Generator"
        className="subtitle"
        inverted
      />
    </Container>
  </Segment>
);

export default HeaderComponent;
