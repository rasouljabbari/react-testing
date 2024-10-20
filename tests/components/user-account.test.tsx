import { render, screen } from '@testing-library/react'
import UserAccount from '../../src/components/UserAccount'
import { User } from '../../src/entities'

describe('UserAccount', () => {
   
    it('should render user name', () => {
        const user: User = {
            name: "Rasoul",
            isAdmin: true,
            id: 1,
          };
        render(<UserAccount user={user} />);
    
        const userName = screen.getByText(/rasoul/i)
    
        expect(userName).toBeInTheDocument()
      })

  it('should render edit button when user is admin', () => {
    const user: User = {
        name: "Rasoul",
        isAdmin: true,
        id: 1,
      };
    render(<UserAccount user={user} />);

    const editButton = screen.getByRole('button', {
        name: /edit/i
    })
    expect(editButton).toBeInTheDocument()
  })

  it('should render edit button when user is not admin', () => {
    const user: User = {
        name: "Rasoul",
        isAdmin: false,
        id: 1,
      };
    render(<UserAccount user={user} />);

    const editButton = screen.queryByRole('button')
    expect(editButton).not.toBeInTheDocument()
  })

})