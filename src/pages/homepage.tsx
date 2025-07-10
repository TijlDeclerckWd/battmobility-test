import { Container } from '@mui/material'
import { EmojiVoting } from '../components/EmojiVoting'

export function Homepage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <EmojiVoting />
    </Container>
  )
}
