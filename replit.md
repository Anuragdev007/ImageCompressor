# Image Compression Tool

## Overview

This is a full-stack web application for compressing JPEG images. Built with React on the frontend and Express.js on the backend, it provides a modern, user-friendly interface for uploading, compressing, and downloading JPEG files with customizable compression settings.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with Radix UI components (shadcn/ui)
- **State Management**: React hooks with custom image compression hook
- **File Handling**: HTML5 drag-and-drop with react-dropzone
- **Image Processing**: Client-side canvas-based compression
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **Build System**: ESBuild for server-side bundling
- **Development**: tsx for TypeScript execution in development

### Data Storage
- **Database**: PostgreSQL via Neon Database
- **Schema Management**: Drizzle migrations in `./migrations` directory
- **In-Memory Storage**: Fallback memory storage implementation for development
- **File Storage**: Client-side blob storage for image processing

## Key Components

### Frontend Components
1. **UploadZone**: Drag-and-drop file upload interface
2. **FileCard**: Individual file display with progress and status
3. **CompressionSettings**: Control panel for quality, format, and resize options
4. **ComparisonModal**: Before/after image comparison view
5. **UI Components**: Complete shadcn/ui component library

### Backend Components
1. **Storage Interface**: Abstracted CRUD operations with memory and database implementations
2. **Route Registration**: Modular Express route setup
3. **Vite Integration**: Development server with HMR support
4. **Error Handling**: Global error middleware

### Image Processing
- **Compression**: Canvas-based JPEG/WebP compression
- **Resizing**: Optional width-based resizing
- **Format Conversion**: JPEG to WebP conversion support
- **Progress Tracking**: Real-time compression progress updates

## Data Flow

1. **File Upload**: Users drag/drop or select JPEG files
2. **Client Validation**: File type and format validation
3. **Preview Generation**: Immediate thumbnail generation
4. **Compression Processing**: Client-side canvas manipulation
5. **Progress Updates**: Real-time status and progress feedback
6. **Download Management**: Individual or batch file downloads
7. **Statistics Tracking**: Session-based compression metrics

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database connectivity
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-dropzone**: File upload handling
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **tsx**: TypeScript execution
- **esbuild**: Server bundling

## Deployment Strategy

### Production Build
1. **Frontend**: Vite builds static assets to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push`

### Environment Configuration
- **DATABASE_URL**: Required PostgreSQL connection string
- **NODE_ENV**: Environment detection (development/production)
- **REPL_ID**: Replit-specific configuration for development tools

### Hosting Considerations
- **Static Assets**: Frontend served from `dist/public`
- **API Routes**: All backend routes prefixed with `/api`
- **Database**: Serverless PostgreSQL via Neon
- **Session Storage**: PostgreSQL-backed sessions for scalability

## Recent Changes (Latest Session)
- July 05, 2025 (Latest). Updated AdSense script with user's actual client ID (ca-pub-1611896159614248) for account verification
- July 05, 2025. Created comprehensive legal and support pages for AdSense compliance
- July 05, 2025. Added Contact Support, Privacy Policy, About Us, Terms of Service, and Help pages
- July 05, 2025. Implemented multiple AdSense ad placements throughout the application
- July 05, 2025. Created SEO-optimized sitemap.xml and robots.txt for search engine indexing
- July 05, 2025. Added Google Analytics integration placeholder for traffic tracking
- July 05, 2025. Fixed TypeScript errors and removed unused storage components
- July 05, 2025. Enhanced batch processing with queue management system
- July 05, 2025. Added quality assessment with visual feedback and recommendations  
- July 05, 2025. Created landing page with clean, intuitive interface and clear instructions
- July 05, 2025. Integrated Google AdSense for monetization with placeholder ads in development
- July 05, 2025. Fixed font color issues and improved accessibility with dialog titles

## Key Features Added
### Batch Processing & Queue Management
- Intelligent queue system for large batches of images
- Configurable concurrency (1-6 simultaneous processes)
- Progress tracking with retry functionality for failed compressions
- Real-time status updates and batch statistics

### Quality Assessment System
- Visual quality scoring with recommendations (excellent/good/acceptable/poor)
- File size reduction percentage calculations
- Quality metrics integrated into file cards
- Smart recommendations based on compression efficiency

### Landing Page
- Professional marketing page with clear value proposition
- Feature highlights and 3-step process explanation
- SEO optimized with meta tags and Open Graph support
- Responsive design with gradient backgrounds

### AdSense Integration & Content Pages
- Google AdSense script integration in HTML head with multiple ad formats
- 7 different ad components (header, sidebar, rectangle, square, skyscraper, leaderboard, mobile)
- Strategic ad placement throughout application for maximum revenue
- Development placeholder ads with production-ready implementation
- Comprehensive content pages for AdSense compliance:
  - Privacy Policy with detailed GDPR compliance
  - Terms of Service with full legal coverage  
  - About Us page with company story and values
  - Contact Support with FAQ and contact forms
  - Help Center with searchable knowledge base
- SEO optimization with sitemap.xml and robots.txt
- Google Analytics integration placeholder

## Changelog
- July 05, 2025. Initial setup with compression functionality

## User Preferences

Preferred communication style: Simple, everyday language.
Focus areas: Batch processing, quality assessment, landing page, AdSense integration.