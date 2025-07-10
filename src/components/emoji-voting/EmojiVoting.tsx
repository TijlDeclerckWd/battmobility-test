import { useEffect, useState } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { RestartAlt as ResetIcon } from '@mui/icons-material'
import { VotingChart } from '../voting-chart/VotingChart'
import { VotingList } from '../VotingList'
import type { EmojiData } from '@/types'
import { INITIAL_EMOJIS, STORAGE_KEY } from './constant'

export function EmojiVoting() {
  const [emojis, setEmojis] = useState<Array<EmojiData>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : INITIAL_EMOJIS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emojis))
  }, [emojis])

  const handleVote = (emojiChar: string) => {
    setEmojis((prev) =>
      prev.map((emoji) =>
        emoji.emoji === emojiChar
          ? { ...emoji, votes: emoji.votes + 1 }
          : emoji,
      ),
    )
  }

  const handleReset = () => {
    setEmojis(INITIAL_EMOJIS)
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1300px', margin: '0 auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Emoji Voting App
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ResetIcon />}
          onClick={handleReset}
        >
          Reset Votes
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <VotingList data={emojis} onVote={handleVote} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <VotingChart data={emojis} />
        </Grid>
      </Grid>
    </Box>
  )
}
