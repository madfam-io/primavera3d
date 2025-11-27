import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/ui/Card';

// Mock framer-motion to forward className properly
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} data-testid="card">
        {children}
      </div>
    ),
  },
}));

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    render(<Card>Default Card</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('bp-card-base');
  });

  it('applies interactive variant class', () => {
    render(<Card variant="interactive">Interactive Card</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('bp-card-interactive');
    expect(card.className).toContain('cursor-pointer');
  });

  it('applies minimal variant class', () => {
    render(<Card variant="minimal">Minimal Card</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('blueprint-sheet');
  });

  it('applies hero variant class', () => {
    render(<Card variant="hero">Hero Card</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('neon-border');
    expect(card.className).toContain('pulse-glow');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom Card</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('custom-class');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    fireEvent.click(screen.getByText('Clickable Card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with interactive variant and handles click', () => {
    const handleClick = vi.fn();
    render(
      <Card variant="interactive" onClick={handleClick}>
        Interactive Clickable
      </Card>
    );
    fireEvent.click(screen.getByText('Interactive Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
