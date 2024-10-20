export default function Greet({name} :{name?: string}) {
  if (name) return <h1>Hello {name}</h1>;
  return <button type="button">login</button>;
}
