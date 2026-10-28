import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './portfolio-polish.css'
import 'lenis/dist/lenis.css'
import { ReactLenis } from 'lenis/react'

const lenisOptions = {
  autoRaf: true,
  lerp: 0.075,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  syncTouch: false,
  anchors: { offset: -88, duration: 1.2 },
  respectReducedMotion: true,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactLenis root options={lenisOptions}>
      <App />
    </ReactLenis>
  </React.StrictMode>,
)
