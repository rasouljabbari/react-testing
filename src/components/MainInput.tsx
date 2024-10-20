interface MainInputType {
    type: string,
    name: string,
    value: string,
    placeholder: string,
    setInputs: (v: any) => void,
}
export default function MainInput({type,name,value,placeholder,setInputs}: MainInputType) {

    const inputHandler = (e) => {
      setInputs(prev => ({
        ...prev, 
        [e.target.name]: e.target.value,
      }));
    }

  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={inputHandler}
    />
  );
}
