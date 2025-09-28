import { Person2 } from '@mui/icons-material'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithTheme } from '@/test/render-with-theme'
import ListWrapper from '../list-wrapper'

const MockIcon = () => <Person2 />

describe('ListWrapper', () => {
  it('should render children and list header when hasContent is true', () => {
    renderWithTheme(
      <ListWrapper
        hasContent
        listHeader={<div data-testid="list-header">List Header</div>}
      >
        <>
          <div data-testid="list-item-1">Item 1</div>
          <div data-testid="list-item-2">Item 2</div>
        </>
      </ListWrapper>
    )

    expect(screen.getByTestId('list-header')).toBeInTheDocument()
    expect(screen.getByText('List Header')).toBeInTheDocument()
    expect(screen.getByTestId('list-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('list-item-2')).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('should render empty state with icon and text when hasContent is false', () => {
    renderWithTheme(
      <ListWrapper
        noContentText="No items found"
        noContentIcon={<MockIcon />}
      />
    )

    expect(screen.getByTestId('Person2Icon')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'No items found' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
