import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event'

describe('TermsAndConditions', () => {

    const renderComponent = () => {
        render(<TermsAndConditions/>)

        return {
          heading: screen.getByRole("heading"),
          checkbox: screen.getByRole("checkbox"),
          button: screen.getByRole("button"),
        };
    }

    it('should render text and initial states', () => {

        const { button, checkbox, heading } = renderComponent();

        expect(heading).toHaveTextContent('Terms & Conditions')

        expect(checkbox).not.toBeChecked()

        expect(button).toBeDisabled()
    })

    it('should render submit button when user clicked on checkbox', async () => {
        
        const { button, checkbox } = renderComponent();

        const user = userEvent.setup()

        await user.click(checkbox)
        expect(checkbox).toBeChecked()

        expect(button).toBeEnabled()
    })
})