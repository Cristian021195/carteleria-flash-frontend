import { BrowserRouter } from "react-router-dom"
import { PublicRouter } from './router/PublicRouter';
function App() {
  return (
    <BrowserRouter>
      <PublicRouter/>
    </BrowserRouter>
  )
}

export default App
