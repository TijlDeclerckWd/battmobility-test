import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Add as AddIcon, RestartAlt as ResetIcon } from '@mui/icons-material'
import { VotingChart } from './VotingChart'

interface EmojiData {
  emoji: string
  votes: number
}

const INITIAL_EMOJIS: Array<EmojiData> = [
  { emoji: '😁', votes: 0 },
  { emoji: '🎉', votes: 0 },
  { emoji: '😢', votes: 0 },
  { emoji: '😡', votes: 0 },
  { emoji: '🤯', votes: 0 },
]

const STORAGE_KEY = 'emoji-votes'

export function EmojiVoting() {
  const [emojis, setEmojis] = useState<Array<EmojiData>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : INITIAL_EMOJIS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emojis))
  }, [emojis])

  const handleVote = (index: number) => {
    setEmojis((prev) =>
      prev.map((emoji, i) =>
        i === index ? { ...emoji, votes: emoji.votes + 1 } : emoji,
      ),
    )
  }

  const handleReset = () => {
    setEmojis(INITIAL_EMOJIS)
  }

  const sortedEmojis = [...emojis].sort((a, b) => b.votes - a.votes)

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
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Stack spacing={2}>
              {sortedEmojis.map((item) => {
                const originalIndex = emojis.findIndex(
                  (e) => e.emoji === item.emoji,
                )
                return (
                  <Card key={item.emoji} variant="outlined">
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="h2" component="span">
                            {item.emoji}
                          </Typography>
                          <Chip
                            label={`${item.votes} votes`}
                            color="primary"
                            size="medium"
                          />
                        </Stack>
                        <IconButton
                          color="primary"
                          onClick={() => handleVote(originalIndex)}
                          size="large"
                          sx={{
                            border: 2,
                            borderColor: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>
                )
              })}
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <VotingChart data={emojis} />
        </Grid>
      </Grid>
    </Box>
  )
}
