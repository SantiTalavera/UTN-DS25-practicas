// src/components/ErrorBoundary.jsx
import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error){ return { hasError: true, error } }
  componentDidCatch(err, info){ console.error('UI error:', err, info) }
  render(){
    if (this.state.hasError) {
      return <div className="alert alert-danger m-3">
        <strong>Se produjo un error:</strong> {String(this.state.error)}
      </div>
    }
    return this.props.children
  }
}
