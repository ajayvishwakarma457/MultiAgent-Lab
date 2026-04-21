import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoItem from './TodoItem'

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false,
    priority: 'medium',
    category: 'work',
  }

  const mockCategoryColor = vi.fn((_cat) => '#667eea')
  const mockOnToggle = vi.fn()
  const mockOnDelete = vi.fn()

  it('renders todo text', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('renders priority badge', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    expect(screen.getByText('M')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    expect(screen.getByText('work')).toBeInTheDocument()
  })

  it('renders unchecked checkbox when todo is not completed', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('renders checked checkbox when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('applies completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    const listItem = screen.getByText('Test todo').closest('li')
    expect(listItem).toHaveClass('completed')
  })

  it('applies priority class', () => {
    const highPriorityTodo = { ...mockTodo, priority: 'high' }
    render(
      <TodoItem
        todo={highPriorityTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    const listItem = screen.getByText('Test todo').closest('li')
    expect(listItem).toHaveClass('priority-high')
  })

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(mockOnToggle).toHaveBeenCalledWith(1)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    const deleteButton = screen.getByRole('button', { name: /delete task/i })
    fireEvent.click(deleteButton)
    expect(mockOnDelete).toHaveBeenCalledWith(1)
  })

  it('has proper accessibility labels', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        getCategoryColor={mockCategoryColor}
      />
    )
    expect(screen.getByLabelText(/check task: test todo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/delete task: test todo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority: medium/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category: work/i)).toBeInTheDocument()
  })
})
