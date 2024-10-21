import { Toaster } from 'react-hot-toast'
import ToastDemo from './components/ToastDemo'
import Providers from './providers'

function App() {

  return (
    <Providers>
      <ToastDemo />
      <Toaster/>
    </Providers>
  )
}

export default App
