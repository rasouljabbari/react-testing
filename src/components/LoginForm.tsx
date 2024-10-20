import { useState } from "react";
import MainInput from "./MainInput";

interface InputFields {
  username : string,
  password: string
}

const LoginForm = () => {

  const [inputs, setInputs] = useState<InputFields>({
    username: "",
    password: ""
  });



  const submitHandler = (e) => {
    e.preventDefault()
    setInputs({
      username: "",
      password: "",
    });
  }

  console.log(inputs);
  

  return (
    <form onSubmit={submitHandler}>
      <MainInput
        type={"text"}
        name={"username"}
        placeholder={"Username or Email address"}
        value={inputs?.username}
        setInputs={setInputs}
      />
      <br />
      <MainInput
        name={"password"}
        setInputs={setInputs}
        placeholder={"Password"}
        type={"password"}
        value={inputs?.password}
      />
      <br />
      {inputs?.username && <p>Username is : {inputs.username}</p>}

      <button disabled={!inputs.password || !inputs.username} type="submit">
        Submit form
      </button>
    </form>
  );
};

export default LoginForm;