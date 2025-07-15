import './App.css'
import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/welcome/Welcome'
import DifficultyMenu from './pages/difficultyMenu/DifficultyMenu'
import Game from './pages/game/Game'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />}></Route>
      <Route path='/difficulty' element={<DifficultyMenu />}></Route>
      <Route path='/game' element={<Game />}></Route>
    </Routes>
  )
}

export default App
