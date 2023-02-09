import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

function AboutSpotit() {
  const [activeIndex, setIndex] = React.useState(null)
  function handleClick(e, { index }) {
    setIndex(index)
  }
  return (
    <>
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
          <Icon name="dropdown" />
          מה תוכלו לעשות באתר?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            {' '}
            האתר מאפשר לכם ליצור משחק קלפים משלכם! תוכלו לעשות זאת ב-3 דרכים או לשלב כל אחת מהן
            ביחד: 1.בחרו תמונות מהמחשב על ידי לחיצה על הכפתור "בחר תמונות" התמונות שתעלו יהפכו להיות
            התמונות שתקבלו על קלפי המשחק! 2. בחרו תמונות מגלריית התמונות על ידי לחיצה על הכפתור
            "גלריית תמונות" 3. כתבו טקסט לתיבת הטקסט, בחרו צבע לרקע וצבע לטקסט וגופן. כשסיימתם לכתוב
            לחו על כפתור "תמונה מטקסט" והטקסט יהפוך לתמונה כאשר העלתם את מספר התמונת הנדרש, לחצו על
            הכפתור "ייצר קלפים להדפסה" אם תרצו למחוק תמונה מהאוסף שיצרתם, פשוט לחצו על התמונה והיא
            תמחק מהאוסף. שימו לב! פעולה זו היא בלתי הפיכה. בהצלחה!
          </p>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
          <Icon name="dropdown" />
          What is spot it and how to play it?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            RULES: The object of the game is to make matches and score points. Players find the
            matching symbols between two cards, a match must have the same shape and the same color;
            only the size may be different. There are 4 different mini games you can play. Version 1
            – The Tower. Shuffle the cards and deal one card face-down to each player. The rest of
            the cards form the draw pile, which is placed face-up in the center of the table. The
            object is to collect the most cards. Players simultaneously flip over their cards. They
            then try to spot the one symbol that appears both on the center card and on their own
            cards. If they are the first player to do so, they call it out and take the center card
            and place it face-up on top of their flipped card, building a personal pile. They will
            now use the top card of their personal pile to match with the new center card. Each time
            a new center card is revealed, this process is repeated. Play continues until there are
            no cards remaining in the draw pile. The player with the most cards in their personal
            pile wins.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-TgMfaqNdAs"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClick}>
          <Icon name="dropdown" />
          האם יש סרטון שמסביר על המשחק בעברית?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>בוודאי!</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/BJBJPWmZENA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default AboutSpotit
