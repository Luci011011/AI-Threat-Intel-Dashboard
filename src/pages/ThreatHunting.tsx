import React, { useState } from 'react';
import { Search, FileSearch, Hash, Globe, AlertTriangle, CheckCircle, XCircle, Download } from 'lucide-react';
import { ScanResult, IPReputation } from '../types';
import { mockIPReputations } from '../utils/mockData';

const ThreatHunting: React.FC = () => {
  const [searchType, setSearchType] = useState<'ip' | 'url' | 'hash'>('ip');
  const [searchValue, setSearchValue] = useState('');
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [ipReputations, setIpReputations] = useState<IPReputation[]>(mockIPReputations);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!searchValue.trim()) return;

    setIsScanning(true);
    
    // Simulate API call
    setTimeout(() => {
      const result: ScanResult = {
        type: searchType,
        value: searchValue,
        status: Math.random() > 0.5 ? 'malicious' : 'clean',
        threatType: Math.random() > 0.5 ? 'Trojan' : undefined,
        confidence: Math.floor(Math.random() * 40) + 60,
        timestamp: new Date()
      };
      
      setScanResults(prev => [result, ...prev]);
      setIsScanning(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return <CheckCircle className="text-green-400" size={20} />;
      case 'malicious': return <XCircle className="text-cyber-red" size={20} />;
      case 'suspicious': return <AlertTriangle className="text-yellow-500" size={20} />;
      default: return <AlertTriangle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'bg-green-400/20 border-green-400 text-green-400';
      case 'malicious': return 'bg-cyber-red/20 border-cyber-red text-cyber-red';
      case 'suspicious': return 'bg-yellow-500/20 border-yellow-500 text-yellow-500';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-500';
    }
  };

  const getReputationColor = (reputation: string) => {
    switch (reputation) {
      case 'malicious': return 'bg-cyber-red text-white';
      case 'suspicious': return 'bg-yellow-500 text-black';
      case 'clean': return 'bg-green-400 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Panel */}
      <div className="cyber-card">
        <h2 className="text-2xl font-bold text-white mb-6">Threat Intelligence Lookup</h2>
        
        <div className="space-y-4">
          {/* Search Type Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setSearchType('ip')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                searchType === 'ip'
                  ? 'bg-cyber-blue text-cyber-dark'
                  : 'bg-cyber-gray text-gray-300 hover:bg-cyber-gray-light'
              }`}
            >
              <Globe size={16} className="inline mr-2" />
              IP Address
            </button>
            <button
              onClick={() => setSearchType('url')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                searchType === 'url'
                  ? 'bg-cyber-blue text-cyber-dark'
                  : 'bg-cyber-gray text-gray-300 hover:bg-cyber-gray-light'
              }`}
            >
              <FileSearch size={16} className="inline mr-2" />
              URL
            </button>
            <button
              onClick={() => setSearchType('hash')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                searchType === 'hash'
                  ? 'bg-cyber-blue text-cyber-dark'
                  : 'bg-cyber-gray text-gray-300 hover:bg-cyber-gray-light'
              }`}
            >
              <Hash size={16} className="inline mr-2" />
              File Hash
            </button>
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              {searchType === 'ip' && <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />}
              {searchType === 'url' && <FileSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />}
              {searchType === 'hash' && <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />}
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                placeholder={
                  searchType === 'ip' ? 'Enter IP address (e.g., 192.168.1.1)' :
                  searchType === 'url' ? 'Enter URL (e.g., https://example.com)' :
                  'Enter file hash (MD5, SHA1, SHA256)'
                }
                className={`cyber-input w-full ${searchType === 'ip' || searchType === 'url' || searchType === 'hash' ? 'pl-10' : ''}`}
              />
            </div>
            <button
              onClick={handleScan}
              disabled={isScanning || !searchValue.trim()}
              className="cyber-button-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        </div>
      </div>

      {/* IP Reputation Database */}
      {searchType === 'ip' && (
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-white mb-4">IP Reputation Database</h3>
          <div className="space-y-3">
            {ipReputations.map((ip) => (
              <div key={ip.ip} className="p-4 bg-cyber-gray-light rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-white">{ip.ip}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getReputationColor(ip.reputation)}`}>
                        {ip.reputation.toUpperCase()}
                      </span>
                      <span className="text-cyber-blue font-bold">Score: {ip.score}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {ip.country} • {ip.isp}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ip.threats.map((threat) => (
                    <span key={threat} className="px-2 py-1 bg-cyber-red/20 text-cyber-red rounded text-xs">
                      {threat}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last seen: {new Date(ip.lastSeen).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scan Results */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Recent Scan Results</h3>
          {scanResults.length > 0 && (
            <button className="cyber-button bg-cyber-gray hover:bg-cyber-gray-light text-sm flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          )}
        </div>

        {scanResults.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <Search size={48} className="mx-auto mb-4 text-gray-600" />
            <p>No scan results yet. Perform a search to see results here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scanResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(result.status)}
                      <span className="font-semibold text-white">
                        {result.type.toUpperCase()}: {result.value}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(result.status)}`}>
                        {result.status.toUpperCase()}
                      </span>
                      {result.threatType && (
                        <span className="px-2 py-1 bg-cyber-red/20 text-cyber-red rounded text-xs font-semibold">
                          {result.threatType}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Confidence: {result.confidence}% • Scanned: {new Date(result.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatHunting;


