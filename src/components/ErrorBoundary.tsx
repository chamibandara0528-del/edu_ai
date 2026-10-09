import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-500 mb-6 border-2 border-rose-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h1 className="text-3xl font-black mb-4">Error Boundary: App Crushed</h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            සමාවෙන්න! යෙදුමේ යම් දෝෂයක් ඇති වුණා. කරුණාකර පිටුව නැවත අලුත් කරන්න (Refresh).
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg"
          >
            Refresh Page
          </button>
          
          <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10 text-left w-full max-w-lg overflow-auto">
             <p className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-widest">Error Details</p>
             <p className="text-xs font-mono text-rose-400/80 leading-relaxed italic">
                {this.state.error?.message || 'Unknown runtime error'}
             </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
