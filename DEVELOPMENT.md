# SprintGuard AI Development Guide

## Architecture Overview

SprintGuard AI is built with a modern React + Vite stack, focusing on predictive analytics for agile teams.

### Frontend Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── RiskMetrics.tsx  # Risk visualization
│   └── Charts.tsx       # Data visualization
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── App.tsx              # Root component
```

### Key Technologies

- **React 19**: Modern UI library with hooks
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization

## Development Workflow

### Starting Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:5173`

### Building Features

1. Create feature branch
2. Build component
3. Test locally
4. Submit PR

## Project Features

### Risk Prediction
- AI-powered burndown analysis
- Scope creep detection
- Team velocity forecasting
- Stalled ticket identification

### Data Visualization
- Interactive charts
- Real-time metrics
- Trend analysis
- Custom reports

## Common Tasks

### Adding a New Dashboard Component

1. Create component in `src/components/`
2. Import in Dashboard
3. Add TypeScript types
4. Style with Tailwind
5. Add animations with Framer Motion

### Building for Production

```bash
npm run build
```

Output goes to `dist/` directory.
