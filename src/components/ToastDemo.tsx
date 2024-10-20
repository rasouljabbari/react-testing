import toast from "react-hot-toast";

export default function ToastDemo() {
  return (
      <button type="button"
          onClick={() => toast('Hello World', { position: 'top-center', duration: 3000 })}
      >Show Toast</button>
  )
}
