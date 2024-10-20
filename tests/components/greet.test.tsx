import {render,screen} from '@testing-library/react'
import Greet from "../../src/components/Greet";

describe('Greet', () => {
  it("should render with name", () => {
    render(<Greet name="Rasoul" />);
    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/rasoul/i);
  });

  it('should render without name', () => {
      render(<Greet/>)
      const loginButton = screen.getByRole('button')
      expect(loginButton).toBeInTheDocument();
  })
})