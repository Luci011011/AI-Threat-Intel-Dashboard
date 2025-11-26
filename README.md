# AI-Powered Threat Intelligence Dashboard


[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)

A professional, modern, and responsive cybersecurity dashboard designed for security analysts and SOC teams. Features real-time threat intelligence, AI-based scoring, and comprehensive security operations management.

![Dashboard Preview](https://via.placeholder.com/800x400/0a0e27/00d4ff?text=AI+Threat+Intelligence+Dashboard)

## Features

### Core Capabilities

- **Real-time Global Attack Map**: Interactive world map visualization showing cyber-attack locations with severity indicators
- **Live Threat Feed**: Real-time updates for malware, phishing, ransomware, and DDoS threats
- **AI-Based Threat Severity Scoring**: Machine learning-powered threat assessment and prioritization
- **IP Reputation Checker**: Comprehensive IP address reputation analysis
- **URL & File Hash Scanner**: Malware detection for URLs and file hashes (MD5, SHA1, SHA256)
- **MITRE ATT&CK Mapping**: Tactical framework integration for threat classification
- **Alert Prioritization**: ML-driven alert ranking and prioritization
- **Interactive Analytics**: Dynamic charts for attack trends, threat types, and affected industries

### Pages

1. **Login & Role-Based Access Control**
   - Secure authentication system
   - Role-based permissions (Admin, Analyst, Viewer)
   - Session management

2. **Main Dashboard**
   - Real-time attack map
   - Key security metrics
   - Threat trend visualizations
   - High-priority alerts
   - Live data refresh

3. **Threat Feed**
   - Live threat intelligence stream
   - Advanced filtering (type, severity, search)
   - Threat details with MITRE ATT&CK tactics
   - Export capabilities

4. **Incident Response Panel**
   - Incident management workflow
   - Status tracking (Open, Investigating, Contained, Resolved)
   - MITRE ATT&CK tactic mapping
   - Asset tracking
   - Report generation

5. **Threat Hunting Workspace**
   - IP reputation lookup
   - URL scanning
   - File hash analysis
   - Search history and results

6. **Reports & Analytics**
   - Comprehensive threat reports
   - Trend analysis charts
   - Industry impact visualization
   - PDF export functionality
   - Customizable date ranges

7. **Settings & API Management**
   - User profile management
   - API key generation and management
   - Notification preferences
   - Security settings (2FA, password change)
   - API endpoint documentation

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom cybersecurity theme
- **Charts**: Recharts
- **Maps**: Leaflet & React-Leaflet
- **Routing**: React Router v6
- **PDF Export**: jsPDF with autoTable
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-threat-intel-dashboard.git
   cd ai-threat-intel-dashboard
   ```
   
   > **Note**: Replace `yourusername` with your GitHub username or organization name

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage

### Login Credentials

The dashboard includes demo authentication. Use any of the following credentials:

- **Admin**: `admin` / `admin`
- **Analyst**: `analyst` / `analyst`
- **Viewer**: `viewer` / `viewer`

### Features Overview

#### Dashboard
- View real-time global attack map
- Monitor key security metrics
- Track threat trends over time
- Review high-priority alerts

#### Threat Feed
- Browse live threat intelligence
- Filter by type, severity, or search terms
- View detailed threat information
- Export threat data

#### Incident Response
- Create and manage security incidents
- Track incident status and progress
- Map incidents to MITRE ATT&CK tactics
- Generate incident reports

#### Threat Hunting
- Check IP reputation
- Scan URLs for malware
- Analyze file hashes
- View scan history

#### Reports
- Generate comprehensive threat reports
- Export to PDF
- Analyze trends and patterns
- Customize date ranges

#### Settings
- Manage API keys for integrations
- Configure notifications
- Update security settings
- View API documentation

## Design Theme

The dashboard features a dark cybersecurity theme with:
- **Primary Colors**: Neon blue (#00d4ff) and red (#ff006e) accents
- **Background**: Deep dark blue (#0a0e27)
- **Cards**: Dark gray (#1a1f3a) with subtle borders
- **Animations**: Smooth transitions and glow effects
- **Responsive**: Mobile-friendly design

## API Integration

The dashboard is designed to integrate with:
- Threat intelligence feeds
- SIEM platforms
- Security orchestration tools
- External threat databases

API endpoints are documented in the Settings page under API Management.

## Production Considerations

For production deployment:

1. **Backend Integration**: Connect to real threat intelligence APIs
2. **Authentication**: Implement proper authentication backend
3. **Database**: Set up database for persistent data storage
4. **Real-time Updates**: Configure WebSocket connections for live data
5. **Security**: Implement proper CORS, rate limiting, and security headers
6. **Monitoring**: Add logging and error tracking
7. **Performance**: Optimize bundle size and implement code splitting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Maps by [Leaflet](https://leafletjs.com/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built for Security Operations Centers (SOC) and Cybersecurity Teams** 🔒

