'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 sm:p-8 max-w-md w-full relative shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600" />
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center relative border border-red-100">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-black text-oau-navy tracking-tight">Something Went Wrong</h2>
                <p className="text-sm text-slate-600">
                  The Great Ife guide encountered an unexpected error. This usually happens due to a network glitch or a corrupted cache.
                </p>
              </div>

              {this.state.error && (
                <div className="w-full bg-slate-50 p-3 border border-slate-200 overflow-auto max-h-32 text-left">
                  <p className="text-xs font-mono text-slate-500 break-words">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 bg-oau-navy hover:bg-slate-800 text-white font-bold py-3 px-4 border border-transparent transition-colors mt-4"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
