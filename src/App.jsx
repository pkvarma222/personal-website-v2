import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes'
import StatusBanner from './components/StatusBanner'
import Preloader from './components/Preloader'
import { LoadingProvider } from './context/LoadingContext'
import './styles/FilmGrain.css'

function App() {
  return (
    <LoadingProvider>
      <Router>
        <main style={{ height: '100vh', width: '100vw', overflowY: 'auto' }}>
          <Preloader />
          <StatusBanner />
          <div className="film-grain" />
          <AnimatedRoutes />
        </main>
      </Router>
    </LoadingProvider>
  )
}

export default App
