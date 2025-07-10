import { Box, Paper, Typography } from '@mui/material'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { COLORS } from './constants'
import type { VotingChartProps } from './types'

export function VotingChart({ data }: VotingChartProps) {
  const chartData = data.map((item) => ({
    name: item.emoji,
    votes: item.votes,
  }))

  return (
    <Paper
      elevation={3}
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Vote Distribution
      </Typography>
      <Box sx={{ width: '100%', flex: 1, minHeight: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 24 }} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}
