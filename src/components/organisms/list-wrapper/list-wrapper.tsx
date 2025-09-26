import type React from 'react'
import { CardContent, List } from '@mui/material'
import Typography from '@mui/material/Typography'
import CenteredLayout from '@/components/templates/centered-layout'
import { EmptyContainer, ListContainer } from './styles'
import type { ListWrapperProps } from './types'

const ListWrapper: React.FC<ListWrapperProps> = ({
  children,
  hasContent,
  noContentIcon,
  listHeader,
  noContentText,
}) =>
  !hasContent ? (
    <CenteredLayout>
      <EmptyContainer>
        {noContentIcon}
        <Typography variant="h6">{noContentText}</Typography>
      </EmptyContainer>
    </CenteredLayout>
  ) : (
    <CenteredLayout>
      <ListContainer>
        <CardContent>
          {listHeader}
          <List disablePadding>{children}</List>
        </CardContent>
      </ListContainer>
    </CenteredLayout>
  )

export default ListWrapper
