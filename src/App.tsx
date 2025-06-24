import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import AddNote from './components/AddNote'
import GetNotes from './components/GetNotes'
import EditNote from './components/EditNote'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<GetNotes/>} />

          <Route path='/editNote' element={<EditNote />} />
          
      </Routes>
    </BrowserRouter>
  )
}

export default App
