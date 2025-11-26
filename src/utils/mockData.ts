import { Threat, AttackLocation, IPReputation, Incident, Alert, ChartData } from '../types';

export const mockThreats: Threat[] = [
  {
    id: '1',
    type: 'ransomware',
    severity: 'critical',
    title: 'LockBit 3.0 Ransomware Campaign',
    description: 'New variant targeting financial institutions with advanced encryption',
    source: 'Threat Intelligence Feed',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    affectedCountries: ['US', 'UK', 'DE'],
    affectedIndustries: ['Finance', 'Healthcare'],
    ipAddress: '192.168.1.100',
    aiScore: 95,
    mitreTactics: ['TA0001', 'TA0002', 'TA0004']
  },
  {
    id: '2',
    type: 'phishing',
    severity: 'high',
    title: 'Sophisticated CEO Fraud Campaign',
    description: 'Multi-stage phishing attack using AI-generated emails',
    source: 'Email Security Gateway',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    affectedCountries: ['US', 'CA'],
    affectedIndustries: ['Technology', 'Manufacturing'],
    url: 'https://malicious-example.com/phish',
    aiScore: 88,
    mitreTactics: ['TA0001', 'TA0006']
  },
  {
    id: '3',
    type: 'ddos',
    severity: 'high',
    title: 'Large-Scale DDoS Attack on Cloud Infrastructure',
    description: 'Distributed denial of service targeting AWS and Azure services',
    source: 'Network Monitoring',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    affectedCountries: ['US', 'EU', 'ASIA'],
    affectedIndustries: ['Cloud Services', 'E-commerce'],
    aiScore: 82,
    mitreTactics: ['TA0040']
  },
  {
    id: '4',
    type: 'malware',
    severity: 'critical',
    title: 'Trojan Banking Malware Detected',
    description: 'New banking trojan with keylogging and screen capture capabilities',
    source: 'Endpoint Detection',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    affectedCountries: ['US', 'BR', 'MX'],
    affectedIndustries: ['Banking', 'Retail'],
    hash: 'a1b2c3d4e5f6789012345678901234567890abcd',
    aiScore: 92,
    mitreTactics: ['TA0002', 'TA0009']
  }
];

export const mockAttackLocations: AttackLocation[] = [
  { id: '1', lat: 40.7128, lng: -74.0060, type: 'ransomware', severity: 'critical', count: 15 },
  { id: '2', lat: 51.5074, lng: -0.1278, type: 'phishing', severity: 'high', count: 8 },
  { id: '3', lat: 52.5200, lng: 13.4050, type: 'malware', severity: 'critical', count: 12 },
  { id: '4', lat: 37.7749, lng: -122.4194, type: 'ddos', severity: 'high', count: 25 },
  { id: '5', lat: 35.6762, lng: 139.6503, type: 'phishing', severity: 'medium', count: 5 },
  { id: '6', lat: -33.8688, lng: 151.2093, type: 'ransomware', severity: 'high', count: 7 },
  { id: '7', lat: 55.7558, lng: 37.6173, type: 'malware', severity: 'medium', count: 9 },
  { id: '8', lat: 39.9042, lng: 116.4074, type: 'ddos', severity: 'critical', count: 18 },
];

export const mockIPReputations: IPReputation[] = [
  {
    ip: '192.168.1.100',
    reputation: 'malicious',
    score: 95,
    country: 'United States',
    isp: 'Suspicious ISP Network',
    threats: ['Ransomware', 'C2 Server'],
    lastSeen: new Date()
  },
  {
    ip: '10.0.0.50',
    reputation: 'suspicious',
    score: 65,
    country: 'Germany',
    isp: 'Unknown Provider',
    threats: ['Phishing'],
    lastSeen: new Date(Date.now() - 1000 * 60 * 60)
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    title: 'Ransomware Attack on Finance Department',
    status: 'investigating',
    severity: 'critical',
    assignedTo: 'John Doe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    description: 'Multiple systems encrypted by LockBit variant',
    mitreTactics: ['TA0001', 'TA0002', 'TA0004'],
    affectedAssets: ['File Server 01', 'Workstation 15', 'Database Server']
  },
  {
    id: 'INC-002',
    title: 'Phishing Campaign Targeting Executives',
    status: 'contained',
    severity: 'high',
    assignedTo: 'Jane Smith',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    description: 'CEO fraud attempt detected and blocked',
    mitreTactics: ['TA0001', 'TA0006'],
    affectedAssets: ['Email Gateway', 'User Accounts']
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALERT-001',
    title: 'Critical: Ransomware Encryption Detected',
    severity: 'critical',
    source: 'EDR System',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    mlPriority: 98,
    status: 'new'
  },
  {
    id: 'ALERT-002',
    title: 'High: Suspicious Network Traffic',
    severity: 'high',
    source: 'Network Monitor',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    mlPriority: 85,
    status: 'acknowledged'
  },
  {
    id: 'ALERT-003',
    title: 'Medium: Unusual Login Pattern',
    severity: 'medium',
    source: 'SIEM',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    mlPriority: 72,
    status: 'new'
  }
];

export const mockThreatTrends: ChartData[] = [
  { name: 'Mon', value: 120, malware: 45, phishing: 35, ransomware: 25, ddos: 15 },
  { name: 'Tue', value: 150, malware: 55, phishing: 45, ransomware: 30, ddos: 20 },
  { name: 'Wed', value: 180, malware: 65, phishing: 55, ransomware: 35, ddos: 25 },
  { name: 'Thu', value: 200, malware: 75, phishing: 65, ransomware: 40, ddos: 20 },
  { name: 'Fri', value: 220, malware: 85, phishing: 75, ransomware: 45, ddos: 15 },
  { name: 'Sat', value: 190, malware: 70, phishing: 65, ransomware: 40, ddos: 15 },
  { name: 'Sun', value: 160, malware: 60, phishing: 55, ransomware: 35, ddos: 10 },
];

export const mockThreatTypes: ChartData[] = [
  { name: 'Malware', value: 35 },
  { name: 'Phishing', value: 28 },
  { name: 'Ransomware', value: 22 },
  { name: 'DDoS', value: 15 },
];

export const mockIndustries: ChartData[] = [
  { name: 'Finance', value: 32 },
  { name: 'Healthcare', value: 24 },
  { name: 'Technology', value: 18 },
  { name: 'Manufacturing', value: 15 },
  { name: 'Retail', value: 11 },
];

export const mitreTactics = [
  { id: 'TA0001', name: 'Initial Access', description: 'The adversary is trying to get into your network.' },
  { id: 'TA0002', name: 'Execution', description: 'The adversary is trying to run malicious code.' },
  { id: 'TA0003', name: 'Persistence', description: 'The adversary is trying to maintain their foothold.' },
  { id: 'TA0004', name: 'Privilege Escalation', description: 'The adversary is trying to gain higher-level permissions.' },
  { id: 'TA0005', name: 'Defense Evasion', description: 'The adversary is trying to avoid being detected.' },
  { id: 'TA0006', name: 'Credential Access', description: 'The adversary is trying to steal account names and passwords.' },
  { id: 'TA0007', name: 'Discovery', description: 'The adversary is trying to figure out your environment.' },
  { id: 'TA0008', name: 'Lateral Movement', description: 'The adversary is trying to move through your environment.' },
  { id: 'TA0009', name: 'Collection', description: 'The adversary is trying to gather data of interest.' },
  { id: 'TA0010', name: 'Command and Control', description: 'The adversary is trying to communicate with compromised systems.' },
  { id: 'TA0011', name: 'Exfiltration', description: 'The adversary is trying to steal data.' },
  { id: 'TA0040', name: 'Impact', description: 'The adversary is trying to manipulate, interrupt, or destroy systems and data.' },
];

