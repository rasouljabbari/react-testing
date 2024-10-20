import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MainInput from '../../src/components/MainInput';

describe("MainInput", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    const inputProps = {
        name : "password",
        setInputs : onChange,
        placeholder: "Password",
        type: "password",
        value: ""
    }
    render(<MainInput {...inputProps} />);
    return {
      passwordInput: screen.getByPlaceholderText(/password/i),
      onChange,
      user: userEvent.setup(),
      emailValue: "test@info.com",
      passwordValue: "12345678m",
      submitButton: screen.getByRole("button", {
        name: /submit/i,
      })
    };
  };

  it("should render inputs", () => {
    const { usernameInput, passwordInput } = renderComponent();

    expect(usernameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  it("should render username input value", async () => {
    const { usernameInput, user,emailValue } = renderComponent();

    await user.type(usernameInput, emailValue)

    expect(usernameInput).toHaveValue(emailValue);

        // Check if username is displayed
        expect(screen.getByText("Username is : test@info.com")).toBeInTheDocument();


  });

  it("should render password input value", async () => {
    const { passwordInput, user,passwordValue } = renderComponent();

    await user.type(passwordInput, passwordValue)

    expect(passwordInput).toHaveValue(passwordValue);
  });

  it("should render disabled submit button when password is empty", async () => {
    const { submitButton, user, usernameInput, emailValue } = renderComponent();
    expect(submitButton).toBeDisabled();

    await user.type(usernameInput, emailValue)
    expect(submitButton).toBeDisabled() // password is empty

  });

  it("should render disabled submit button when username is empty", async () => {
    const { submitButton, user,passwordValue,passwordInput } = renderComponent();
    expect(submitButton).toBeDisabled()

    await user.type(passwordInput, passwordValue)
    expect(submitButton).toBeDisabled() // username is empty

  });

  it("should render enabled submit button when inputs have a value", async () => {
    const { submitButton, user,passwordValue,passwordInput,usernameInput, emailValue } = renderComponent();

    await user.type(passwordInput, passwordValue)
    await user.type(usernameInput, emailValue)

    expect(submitButton).toBeEnabled()
  });

  it("should render submit function", async () => {
    const { submitButton, user,passwordValue,passwordInput,usernameInput, emailValue } = renderComponent();

    await user.type(passwordInput, passwordValue)
    await user.type(usernameInput, emailValue)

    await user.click(submitButton)

    // Inputs should be cleared
    expect(usernameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });


});