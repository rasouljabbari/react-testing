import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MainInput from '../../src/components/MainInput';

describe("MainInput", () => {
  it('renders the input field with correct attributes', () => {
    render(
      <MainInput
        type="text"
        name="username"
        value=""
        placeholder="Enter your username"
        setInputs={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Enter your username');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveValue('');
  });

  it('calls setInputs with the correct value when the input changes', async () => {
    const mockSetInputs = vi.fn();
    render(
      <MainInput
        type="text"
        name="username"
        value=""
        placeholder="Enter your username"
        setInputs={mockSetInputs}
      />
    );

    const input = screen.getByPlaceholderText('Enter your username');

    await userEvent.type(input, 'testuser');

    expect(mockSetInputs).toHaveBeenCalledTimes(8); // One call per character
    expect(mockSetInputs).toHaveBeenCalledWith(expect.any(Function));
  });

});