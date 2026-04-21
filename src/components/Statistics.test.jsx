import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Statistics from './Statistics'

describe('Statistics Component', () => {
  it('displays total count', () => {
    render(<Statistics totalCount={5} completedCount={2} />)
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getAllByText('5')[0]).toBeInTheDocument()
  })

  it('displays completed count', () => {
    render(<Statistics totalCount={5} completedCount={2} />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('displays progress percentage', () => {
    render(<Statistics totalCount={5} completedCount={2} />)
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
  })

  it('displays 0% when no todos completed', () => {
    render(<Statistics totalCount={5} completedCount={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('displays 0% when totalCount is 0', () => {
    render(<Statistics totalCount={0} completedCount={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('displays 100% when all todos completed', () => {
    render(<Statistics totalCount={5} completedCount={5} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('calculates percentage correctly', () => {
    render(<Statistics totalCount={10} completedCount={3} />)
    expect(screen.getByText('30%')).toBeInTheDocument()
  })

  it('rounds percentage correctly', () => {
    render(<Statistics totalCount={3} completedCount={1} />)
    expect(screen.getByText('33%')).toBeInTheDocument()
  })

  it('has proper aria attributes for live updates', () => {
    render(<Statistics totalCount={5} completedCount={2} />)
    const panel = screen.getByText('Progress').closest('.statistics-panel')
    expect(panel).toHaveAttribute('aria-live', 'polite')
    expect(panel).toHaveAttribute('aria-atomic', 'true')
  })

  it('renders progress bar element', () => {
    render(<Statistics totalCount={5} completedCount={2} />)
    const progressBar = document.querySelector('.progress-bar')
    expect(progressBar).toHaveStyle({ width: '40%' })
  })
})
