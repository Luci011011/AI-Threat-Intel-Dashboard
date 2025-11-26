import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle, CheckCircle, Clock, XCircle, Users, FileText, Shield } from 'lucide-react';
import { mockIncidents, mitreTactics } from '../utils/mockData';
import { Incident } from '../types';

const IncidentResponse: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="text-cyber-red" size={20} />;
      case 'investigating': return <Clock className="text-yellow-500" size={20} />;
      case 'contained': return <Shield className="text-cyber-blue" size={20} />;
      case 'resolved': return <CheckCircle className="text-green-400" size={20} />;
      default: return <XCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-cyber-red/20 border-cyber-red text-cyber-red';
      case 'investigating': return 'bg-yellow-500/20 border-yellow-500 text-yellow-500';
      case 'contained': return 'bg-cyber-blue/20 border-cyber-blue text-cyber-blue';
      case 'resolved': return 'bg-green-400/20 border-green-400 text-green-400';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-cyber-red text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-cyber-blue text-cyber-dark';
      default: return 'bg-gray-500 text-white';
    }
  };

  const updateIncidentStatus = (id: string, newStatus: Incident['status']) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { ...inc, status: newStatus, updatedAt: new Date() } : inc
    ));
    if (selectedIncident?.id === id) {
      setSelectedIncident({ ...selectedIncident, status: newStatus, updatedAt: new Date() });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Incidents List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Active Incidents</h2>
          <button className="cyber-button-primary flex items-center gap-2">
            <Plus size={16} />
            New Incident
          </button>
        </div>

        {/* Filters */}
        <div className="cyber-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cyber-input w-full pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cyber-input"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="contained">Contained</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Incidents */}
        <div className="space-y-3">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className={`cyber-card cursor-pointer transition-all hover:border-cyber-blue ${
                selectedIncident?.id === incident.id ? 'border-cyber-blue border-2' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(incident.status)}
                    <h3 className="text-lg font-bold text-white">{incident.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(incident.status)}`}>
                      {incident.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{incident.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {incident.assignedTo}
                    </span>
                    <span>Created: {new Date(incident.createdAt).toLocaleString()}</span>
                    <span>Updated: {new Date(incident.updatedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Details Panel */}
      <div className="space-y-4">
        {selectedIncident ? (
          <div className="cyber-card sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Incident Details</h3>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Incident ID</div>
                <div className="text-white font-semibold">{selectedIncident.id}</div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-1">Status</div>
                <div className="flex gap-2">
                  {['open', 'investigating', 'contained', 'resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateIncidentStatus(selectedIncident.id, status as Incident['status'])}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        selectedIncident.status === status
                          ? getStatusColor(status)
                          : 'bg-cyber-gray text-gray-400 hover:bg-cyber-gray-light'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-1">Assigned To</div>
                <div className="text-white">{selectedIncident.assignedTo}</div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-2">MITRE ATT&CK Tactics</div>
                <div className="space-y-2">
                  {selectedIncident.mitreTactics.map((tacticId) => {
                    const tactic = mitreTactics.find(t => t.id === tacticId);
                    return tactic ? (
                      <div key={tacticId} className="p-3 bg-cyber-gray-light rounded-lg">
                        <div className="font-semibold text-cyber-blue">{tactic.id}: {tactic.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{tactic.description}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-2">Affected Assets</div>
                <div className="space-y-1">
                  {selectedIncident.affectedAssets.map((asset) => (
                    <div key={asset} className="p-2 bg-cyber-gray-light rounded text-sm text-white">
                      {asset}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-1">Timeline</div>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-300">
                    Created: {new Date(selectedIncident.createdAt).toLocaleString()}
                  </div>
                  <div className="text-gray-300">
                    Updated: {new Date(selectedIncident.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cyber-gray-light">
                <button className="cyber-button-primary w-full">
                  <FileText size={16} className="inline mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cyber-card text-center text-gray-400 py-12">
            <AlertTriangle size={48} className="mx-auto mb-4 text-gray-600" />
            <p>Select an incident to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentResponse;


