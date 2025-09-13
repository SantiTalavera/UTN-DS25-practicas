// src/components/ErrorBoundary.jsx
import React from 'react'
export class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error){ return { hasError: true, error } }
  componentDidCatch(err, info){ console.error('UI error:', err, info) }
  render(){
    if (this.state.hasError) return <div className="alert alert-danger m-3">Error: {String(this.state.error)}</div>
    return this.props.children
  }
}
