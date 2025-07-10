import type { EmojiData } from '@/types'

export const INITIAL_EMOJIS: Array<EmojiData> = [
  { emoji: '😁', votes: 0 },
  { emoji: '🎉', votes: 0 },
  { emoji: '😢', votes: 0 },
  { emoji: '😡', votes: 0 },
  { emoji: '🤯', votes: 0 },
]

export const STORAGE_KEY = 'emoji-votes'
