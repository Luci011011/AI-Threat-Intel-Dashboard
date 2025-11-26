import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AttackMap from '../components/AttackMap';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockAttackLocations, mockThreatTrends, mockThreatTypes, mockAlerts } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setRefreshKey(prev => prev + 1);
      }, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const pieColors = ['#00d4ff', '#ff006e', '#ff6b35', '#ffd23f'];

  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical').length;
  const highAlerts = mockAlerts.filter(a => a.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Live Status Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-sm text-gray-400">
            {isLive ? 'Live Data Feed Active' : 'Data Feed Paused'}
          </span>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className="cyber-button-primary text-sm"
        >
          {isLive ? 'Pause' : 'Resume'}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Threats"
          value={247}
          icon={Shield}
          trend={{ value: 12, isPositive: false }}
          color="red"
        />
        <StatCard
          title="Critical Alerts"
          value={criticalAlerts}
          icon={AlertTriangle}
          trend={{ value: 8, isPositive: false }}
          color="red"
        />
        <StatCard
          title="Threats Blocked"
          value="1,234"
          icon={Activity}
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        <StatCard
          title="AI Score Avg"
          value="87.5"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
          color="blue"
        />
      </div>

      {/* Attack Map */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe size={24} className="text-cyber-blue" />
            Global Attack Map
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
              <span className="text-gray-400">Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-blue"></div>
              <span className="text-gray-400">Low</span>
            </div>
          </div>
        </div>
        <div className="h-96">
          <AttackMap locations={mockAttackLocations} />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Trends */}
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-white mb-4">Threat Trends (7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockThreatTrends}>
              <defs>
                <linearGradient id="colorMalware" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff006e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff006e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f4a" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f3a', 
                  border: '1px solid #2a2f4a',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="malware" stackId="1" stroke="#00d4ff" fillOpacity={1} fill="url(#colorMalware)" />
              <Area type="monotone" dataKey="phishing" stackId="1" stroke="#ff006e" fillOpacity={1} fill="url(#colorPhishing)" />
              <Area type="monotone" dataKey="ransomware" stackId="1" stroke="#ff6b35" fillOpacity={1} fill="#ff6b3540" />
              <Area type="monotone" dataKey="ddos" stackId="1" stroke="#ffd23f" fillOpacity={1} fill="#ffd23f40" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Types Distribution */}
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-white mb-4">Threat Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockThreatTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockThreatTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f3a', 
                  border: '1px solid #2a2f4a',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="cyber-card">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap size={24} className="text-cyber-blue" />
          Recent High-Priority Alerts
        </h3>
        <div className="space-y-3">
          {mockAlerts.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-4 bg-cyber-gray-light rounded-lg border-l-4 border-cyber-red"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-white">{alert.title}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    alert.severity === 'critical' ? 'bg-cyber-red text-white' :
                    alert.severity === 'high' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-black'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {alert.source} • ML Priority: {alert.mlPriority} • {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="text-cyber-blue font-bold">
                {alert.mlPriority}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

