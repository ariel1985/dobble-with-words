import { Container, Divider, Header, Icon, IconProps, StrictPaginationItemProps } from "semantic-ui-react"
import React from 'react'

interface Props {
    children: string, text?: string, icon?: IconProps
}

export default function ComponentHeader({ children, text, icon }: Props) {
    return (
        <React.Fragment>
            <Divider horizontal>
                <Header as='h4' textAlign="center">
                    {icon && <Icon {...icon} />}
                </Header>
                {children}
            </Divider>
            {text && <p style={{ textAlign: 'center' }}>
                {text}
            </p>}
        </React.Fragment>
    )
}