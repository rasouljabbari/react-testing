import { render, screen } from '@testing-library/react'
import SearchBox from '../../src/components/SearchBox'
import userEvent from '@testing-library/user-event'

describe('SearchBox', () => {
    const renderComponent = () => {
        const onChange = vi.fn()
        render(<SearchBox onChange={onChange}/>)
        return {
            input : screen.getByPlaceholderText(/search/i),
            onChange,
            user : userEvent.setup(),
            searchTerm: "moz"
        }
    }

    it('should render an input field for searching', () => {
        const {input} = renderComponent()
        expect(input).toBeInTheDocument()
    })

    it('should have value when user type on input', async () => {
        const {input, user,searchTerm} = renderComponent()

        await user.type(input, searchTerm)
        
        expect(input).toHaveValue(searchTerm)
    })

    it("should call onChange when Enter is pressed", async () => {
      const { input, onChange, user,searchTerm } = renderComponent();

      await user.type(input, searchTerm + "{enter}");

      expect(onChange).toHaveBeenCalledWith(searchTerm);
    });

    it('should not call onChange if input field is empty', async () => {
        const {input, onChange, user} = renderComponent()

        await user.type(input, "{enter}")

        expect(onChange).not.toHaveBeenCalled()
    })
})