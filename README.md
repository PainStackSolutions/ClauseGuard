# ClauseGuard - Contract Review Assistant

A modern, professional frontend website for ClauseGuard, an AI-powered contract review assistant that helps identify risky clauses, missing signatures, and renewal deadlines.

## Features

- **Modern UI/UX**: Clean, responsive design with smooth animations and transitions
- **File Upload**: Drag-and-drop interface for PDF and DOCX contract files
- **AI Analysis Simulation**: Loading animations and realistic dummy data for contract analysis
- **Comprehensive Results**: Structured PDF output with detailed risk assessments
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Pages

1. **Home Page**: Professional hero section with product introduction and call-to-action
2. **Upload Page**: File upload interface with loading animations and results display
3. **About Page**: Detailed explanation of features and how the tool works

## Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Vite** - Fast build tool and development server
- **Pinia** - State management
- **Modern CSS** - Responsive design with animations

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Project Structure

```
src/
├── components/
│   └── AppLayout.vue          # Main layout with navigation and footer
├── views/
│   ├── Home.vue              # Home page with hero section
│   ├── Upload.vue            # File upload and analysis page
│   └── About.vue             # About/features page
├── router/
│   └── index.js              # Vue Router configuration
├── App.vue                   # Root component
└── main.js                   # Application entry point
```

## Features Overview

### Contract Analysis

- **Risky Clauses Detection**: Identifies potentially problematic contract terms
- **Missing Signatures**: Scans for required signatures and witness signatures
- **Renewal Deadlines**: Tracks important dates and contract expiration
- **Comprehensive Reports**: Generates detailed PDF reports with recommendations

### User Experience

- **Drag & Drop Upload**: Intuitive file upload interface
- **Loading Animations**: Smooth progress indicators during analysis
- **Responsive Design**: Optimized for all device sizes
- **Modern Animations**: Smooth transitions and hover effects

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open your browser to `http://localhost:5173`

The application is ready to use with simulated contract analysis functionality. Upload a PDF or DOCX file to see the AI analysis in action!
