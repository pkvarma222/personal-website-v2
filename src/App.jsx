import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes'
import StatusBanner from './components/StatusBanner'
import './styles/FilmGrain.css'

function App() {
  return (
    <Router>
      <main style={{ height: '100vh', width: '100vw', overflowY: 'auto' }}>
        <StatusBanner />
        <div className="film-grain" />
        <AnimatedRoutes />
      </main>
    </Router>
  )
}

export default App
