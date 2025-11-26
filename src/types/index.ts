export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  avatar?: string;
}

export interface Threat {
  id: string;
  type: 'malware' | 'phishing' | 'ransomware' | 'ddos';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  source: string;
  timestamp: Date;
  affectedCountries: string[];
  affectedIndustries: string[];
  ipAddress?: string;
  url?: string;
  hash?: string;
  aiScore: number;
  mitreTactics: string[];
}

export interface AttackLocation {
  id: string;
  lat: number;
  lng: number;
  type: 'malware' | 'phishing' | 'ransomware' | 'ddos';
  severity: 'critical' | 'high' | 'medium' | 'low';
  count: number;
}

export interface IPReputation {
  ip: string;
  reputation: 'malicious' | 'suspicious' | 'clean';
  score: number;
  country: string;
  isp: string;
  threats: string[];
  lastSeen: Date;
}

export interface ScanResult {
  type: 'url' | 'hash';
  value: string;
  status: 'clean' | 'malicious' | 'suspicious';
  threatType?: string;
  confidence: number;
  timestamp: Date;
}

export interface Incident {
  id: string;
  title: string;
  status: 'open' | 'investigating' | 'contained' | 'resolved';
  severity: 'critical' | 'high' | 'medium' | 'low';
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  mitreTactics: string[];
  affectedAssets: string[];
}

export interface MITRETactic {
  id: string;
  name: string;
  description: string;
  techniques: string[];
}

export interface Alert {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  timestamp: Date;
  mlPriority: number;
  status: 'new' | 'acknowledged' | 'resolved';
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}


