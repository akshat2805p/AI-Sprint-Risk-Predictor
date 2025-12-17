import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 text-slate-800 p-8 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-2">Something went wrong.</h1>
                    <p className="text-slate-500 mb-8">Don't worry, the team has been notified.</p>

                    <div className="bg-white p-6 rounded-2xl overflow-auto max-w-4xl w-full border border-slate-200 shadow-xl">
                        <h2 className="text-lg font-semibold mb-2 text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Error Details
                        </h2>
                        <pre className="text-red-600 bg-red-50 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap border border-red-100 mb-6">
                            {this.state.error && this.state.error.toString()}
                        </pre>

                        <h2 className="text-lg font-semibold mb-2 text-slate-800">Stack Trace</h2>
                        <pre className="text-slate-500 text-xs font-mono whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-96 overflow-y-auto">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all"
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
