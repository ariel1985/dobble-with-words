import { Divider, Header, Icon, IconProps } from 'semantic-ui-react'

interface Props {
  children: string
  text?: string
  icon?: IconProps
}

export default function ComponentHeader({ children, text, icon }: Props) {
  return (
    <>
      <Divider horizontal>
        <Header as="h4" textAlign="center">
          {icon && <Icon {...icon} />}
        </Header>
        {children}
      </Divider>
      {text && <p style={{ textAlign: 'center' }}>{text}</p>}
    </>
  )
}
