import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { EmojiVoting } from './EmojiVoting'
import { INITIAL_EMOJIS } from './constant'

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('EmojiVoting Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should display all emojis from the initial list', () => {
    renderWithTheme(<EmojiVoting />)

    INITIAL_EMOJIS.forEach((emojiData) => {
      expect(screen.getByText(emojiData.emoji)).toBeInTheDocument()
    })
  })

  it('should display the vote count next to each emoji', () => {
    renderWithTheme(<EmojiVoting />)

    // All emojis start with 0 votes, so we should see "0 votes" 5 times
    const voteTexts = screen.getAllByText('0 votes')
    expect(voteTexts).toHaveLength(INITIAL_EMOJIS.length)
  })

  it('should increase the vote count when clicking the vote button', async () => {
    const user = userEvent.setup()
    renderWithTheme(<EmojiVoting />)

    const voteButtons = screen.getAllByTestId('AddIcon')
    const firstVoteButton = voteButtons[0].closest('button')!

    expect(screen.getAllByText('0 votes')).toHaveLength(INITIAL_EMOJIS.length)

    await user.click(firstVoteButton)

    expect(screen.getAllByText('0 votes')).toHaveLength(INITIAL_EMOJIS.length - 1)
    expect(screen.getByText('1 votes')).toBeInTheDocument()

    await user.click(firstVoteButton)

    expect(screen.getAllByText('0 votes')).toHaveLength(INITIAL_EMOJIS.length - 1)
    expect(screen.getByText('2 votes')).toBeInTheDocument()
  })

  it('should sort emojis by vote count with most votes first', async () => {
    const user = userEvent.setup()
    renderWithTheme(<EmojiVoting />)

    const voteButtons = screen.getAllByTestId('AddIcon')
    
    const secondEmojiButton = voteButtons[1].closest('button')!
    
    const thirdEmojiButton = voteButtons[2].closest('button')!

    // Click second emoji 3 times
    await user.click(secondEmojiButton)
    await user.click(secondEmojiButton)
    await user.click(secondEmojiButton)

    // Click third emoji 2 times
    await user.click(thirdEmojiButton)
    await user.click(thirdEmojiButton)

    // Wait for the sorting to happen
    await waitFor(() => {
      expect(screen.getByText('3 votes')).toBeInTheDocument()
      expect(screen.getByText('2 votes')).toBeInTheDocument()
    })

    const reorderedButtons = screen.getAllByTestId('AddIcon')
    
    const firstCard = reorderedButtons[0].closest('.MuiCard-root')!
    expect(firstCard).toHaveTextContent('🎉')
    expect(firstCard).toHaveTextContent('3 votes')
    
    const secondCard = reorderedButtons[1].closest('.MuiCard-root')!
    expect(secondCard).toHaveTextContent('😢')
    expect(secondCard).toHaveTextContent('2 votes')
  })

  it('should persist votes in localStorage', async () => {
    const user = userEvent.setup()
    const { unmount } = renderWithTheme(<EmojiVoting />)

    const firstVoteButton = screen.getAllByRole('button', { name: '' })[0]
    await user.click(firstVoteButton)
    await user.click(firstVoteButton)

    expect(screen.getByText('2 votes')).toBeInTheDocument()

    unmount()

    renderWithTheme(<EmojiVoting />)

    expect(screen.getByText('2 votes')).toBeInTheDocument()
  })

  it('should reset all votes when clicking the reset button', async () => {
    const user = userEvent.setup()
    renderWithTheme(<EmojiVoting />)

    const voteButtons = screen.getAllByRole('button', { name: '' })
    await user.click(voteButtons[0])
    await user.click(voteButtons[1])
    await user.click(voteButtons[1])

    expect(screen.getByText('1 votes')).toBeInTheDocument()
    expect(screen.getByText('2 votes')).toBeInTheDocument()

    const resetButton = screen.getByRole('button', { name: /reset votes/i })
    await user.click(resetButton)

    const voteChips = screen.getAllByText('0 votes')
    expect(voteChips).toHaveLength(INITIAL_EMOJIS.length)
  })

  it('should handle multiple rapid clicks correctly', async () => {
    const user = userEvent.setup()
    renderWithTheme(<EmojiVoting />)

    const firstVoteButton = screen.getAllByRole('button', { name: '' })[0]

    await user.click(firstVoteButton)
    await user.click(firstVoteButton)
    await user.click(firstVoteButton)
    await user.click(firstVoteButton)
    await user.click(firstVoteButton)

    expect(screen.getByText('5 votes')).toBeInTheDocument()
  })
})