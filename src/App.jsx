import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes'
import './styles/FilmGrain.css'

function App() {
  return (
    <Router>
      <main style={{ height: '100vh', width: '100vw', overflowY: 'auto' }}>
        <div className="film-grain" />
        <AnimatedRoutes />
      </main>
    </Router>
  )
}

export default App
