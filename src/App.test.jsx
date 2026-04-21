import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders app header', () => {
    render(<App />)
    expect(screen.getByText('My Todos')).toBeInTheDocument()
  })

  it('renders input field and add button', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add new todo/i })
    ).toBeInTheDocument()
  })

  it('adds a todo when user types and clicks add', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await userEvent.type(input, 'Test todo')
    fireEvent.click(addButton)

    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('adds a todo on Enter key press', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')

    await userEvent.type(input, 'Test todo{Enter}')

    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('prevents adding empty todos', async () => {
    render(<App />)
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    fireEvent.click(addButton)

    expect(
      screen.getByText('No todos yet. Add one to get started!')
    ).toBeInTheDocument()
  })

  it('prevents adding todos longer than 500 characters', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const maxText = 'a'.repeat(500)

    await userEvent.type(input, maxText)
    fireEvent.click(screen.getByRole('button', { name: /add new todo/i }))

    expect(screen.getByText(maxText)).toBeInTheDocument()
    expect(input).toHaveAttribute('maxLength', '500')
  })

  it('toggles todo completion status', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await userEvent.type(input, 'Test todo')
    fireEvent.click(addButton)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    const todoItem = screen.getByText('Test todo').closest('li')
    expect(todoItem).toHaveClass('completed')
  })

  it('filters todos by status', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await userEvent.type(input, 'Active todo')
    fireEvent.click(addButton)

    await userEvent.type(input, 'Completed todo')
    fireEvent.click(addButton)

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1])

    const completedButton = screen.getByRole('button', {
      name: /show completed/i,
    })
    fireEvent.click(completedButton)

    expect(screen.getByText('Completed todo')).toBeInTheDocument()
    expect(screen.queryByText('Active todo')).not.toBeInTheDocument()
  })

  it('displays empty message when no todos match filter', async () => {
    const { container } = render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await userEvent.type(input, 'Active todo')
    fireEvent.click(addButton)

    const completedButton = screen.getByRole('button', {
      name: /show completed/i,
    })
    fireEvent.click(completedButton)

    const emptyMessage = container.querySelector('.empty-message')
    expect(emptyMessage).toBeInTheDocument()
    expect(emptyMessage?.textContent).toMatch(/no completed/i)
  })

  it('clears completed todos', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await userEvent.type(input, 'Todo 1')
    fireEvent.click(addButton)

    await userEvent.type(input, 'Todo 2')
    fireEvent.click(addButton)

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    const clearButton = screen.getByRole('button', {
      name: /clear 1 completed/i,
    })
    window.confirm = vi.fn(() => true)
    fireEvent.click(clearButton)

    expect(screen.getByText('Todo 2')).toBeInTheDocument()
    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument()
  })

  it('persists todos to localStorage', async () => {
    const { unmount } = render(<App />)
    const input = screen.getByPlaceholderText('Add a new todo...')
    const addButton = screen.getByRole('button', { name: /add new todo/i })

    await userEvent.type(input, 'Persistent todo')
    fireEvent.click(addButton)

    unmount()

    render(<App />)
    expect(screen.getByText('Persistent todo')).toBeInTheDocument()
  })

  it('persists dark mode preference to localStorage', async () => {
    const { unmount, container } = render(<App />)
    const darkModeButton = container.querySelector('.dark-mode-toggle')

    fireEvent.click(darkModeButton)

    unmount()

    const { container: container2 } = render(<App />)
    const app = container2.querySelector('.app')
    expect(app).toHaveClass('dark-mode')
  })
})
