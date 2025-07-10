import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { EmojiData } from '@/types'

export interface VotingListProps {
  data: Array<EmojiData>
  onVote: (emoji: string) => void
}

export function VotingList({ data, onVote }: VotingListProps) {
  const sortedEmojis = [...data].sort((a, b) => b.votes - a.votes)

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Stack spacing={2}>
        {sortedEmojis.map((item) => (
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
                  onClick={() => onVote(item.emoji)}
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
        ))}
      </Stack>
    </Paper>
  )
}