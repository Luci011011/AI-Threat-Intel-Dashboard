import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, RefreshCw, AlertCircle, Shield, Lock, Zap, Globe } from 'lucide-react';
import { mockThreats } from '../utils/mockData';
import { Threat } from '../types';

const ThreatFeed: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>(mockThreats);
  const [filteredThreats, setFilteredThreats] = useState<Threat[]>(mockThreats);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let filtered = threats;

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(t => t.severity === severityFilter);
    }

    setFilteredThreats(filtered);
  }, [threats, searchTerm, typeFilter, severityFilter]);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Simulate new threats
        setThreats(prev => [...prev, ...mockThreats.slice(0, 1)]);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'malware': return <Shield size={20} />;
      case 'phishing': return <AlertCircle size={20} />;
      case 'ransomware': return <Lock size={20} />;
      case 'ddos': return <Zap size={20} />;
      default: return <Globe size={20} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-cyber-red bg-cyber-red/10';
      case 'high': return 'border-orange-500 bg-orange-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-cyber-blue bg-cyber-blue/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return 'text-cyber-red';
    if (score >= 70) return 'text-orange-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-cyber-blue';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-sm text-gray-400">Live Feed</span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className="cyber-button-primary text-sm"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
        <div className="flex gap-2">
          <button className="cyber-button bg-cyber-gray hover:bg-cyber-gray-light text-sm flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="cyber-button bg-cyber-gray hover:bg-cyber-gray-light text-sm flex items-center gap-2">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="cyber-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search threats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input w-full pl-10"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="cyber-input"
          >
            <option value="all">All Types</option>
            <option value="malware">Malware</option>
            <option value="phishing">Phishing</option>
            <option value="ransomware">Ransomware</option>
            <option value="ddos">DDoS</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="cyber-input"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="text-sm text-gray-400 flex items-center">
            Showing {filteredThreats.length} of {threats.length} threats
          </div>
        </div>
      </div>

      {/* Threat List */}
      <div className="space-y-4">
        {filteredThreats.map((threat) => (
          <div
            key={threat.id}
            className={`cyber-card border-l-4 ${getSeverityColor(threat.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-cyber-blue">
                    {getTypeIcon(threat.type)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{threat.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    threat.severity === 'critical' ? 'bg-cyber-red text-white' :
                    threat.severity === 'high' ? 'bg-orange-500 text-white' :
                    threat.severity === 'medium' ? 'bg-yellow-500 text-black' :
                    'bg-cyber-blue text-cyber-dark'
                  }`}>
                    {threat.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{threat.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span>Source: {threat.source}</span>
                  <span>•</span>
                  <span>{new Date(threat.timestamp).toLocaleString()}</span>
                  {threat.ipAddress && (
                    <>
                      <span>•</span>
                      <span>IP: {threat.ipAddress}</span>
                    </>
                  )}
                  {threat.url && (
                    <>
                      <span>•</span>
                      <span className="text-cyber-blue hover:underline cursor-pointer">URL: {threat.url}</span>
                    </>
                  )}
                  {threat.hash && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-xs">Hash: {threat.hash.substring(0, 16)}...</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {threat.affectedCountries.map((country) => (
                    <span key={country} className="px-2 py-1 bg-cyber-gray-light rounded text-xs text-gray-300">
                      {country}
                    </span>
                  ))}
                  {threat.affectedIndustries.map((industry) => (
                    <span key={industry} className="px-2 py-1 bg-cyber-gray-light rounded text-xs text-gray-300">
                      {industry}
                    </span>
                  ))}
                </div>
                {threat.mitreTactics.length > 0 && (
                  <div className="mt-3">
                    <span className="text-xs text-gray-400">MITRE ATT&CK: </span>
                    {threat.mitreTactics.map((tactic) => (
                      <span key={tactic} className="ml-2 px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded text-xs">
                        {tactic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-4 text-right">
                <div className={`text-2xl font-bold ${getAIScoreColor(threat.aiScore)}`}>
                  {threat.aiScore}
                </div>
                <div className="text-xs text-gray-400">AI Score</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatFeed;

