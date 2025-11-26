import React, { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockThreatTrends, mockThreatTypes, mockIndustries } from '../utils/mockData';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [reportType, setReportType] = useState<'summary' | 'detailed' | 'custom'>('summary');

  const pieColors = ['#00d4ff', '#ff006e', '#ff6b35', '#ffd23f', '#4ade80'];

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Threat Intelligence Report', 14, 20);
    
    // Date range
    doc.setFontSize(12);
    doc.text(`Report Period: Last ${dateRange}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

    // Summary statistics
    doc.setFontSize(16);
    doc.text('Summary Statistics', 14, 50);
    
    const summaryData = [
      ['Metric', 'Value'],
      ['Total Threats', '247'],
      ['Critical Alerts', '12'],
      ['Threats Blocked', '1,234'],
      ['Average AI Score', '87.5'],
    ];
    
    (doc as any).autoTable({
      startY: 55,
      head: [summaryData[0]],
      body: summaryData.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [0, 212, 255] },
    });

    // Threat types
    doc.setFontSize(16);
    doc.text('Threat Types Distribution', 14, (doc as any).lastAutoTable.finalY + 15);
    
    const threatData = mockThreatTypes.map(t => [t.name, t.value.toString()]);
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [['Threat Type', 'Count']],
      body: threatData,
      theme: 'striped',
      headStyles: { fillColor: [0, 212, 255] },
    });

    doc.save(`threat-intel-report-${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Reports & Analytics</h2>
          <p className="text-gray-400">Comprehensive threat intelligence analysis and reporting</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="cyber-input"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button
            onClick={exportToPDF}
            className="cyber-button-primary flex items-center gap-2"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="cyber-card">
        <div className="flex gap-2">
          {(['summary', 'detailed', 'custom'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                reportType === type
                  ? 'bg-cyber-blue text-cyber-dark'
                  : 'bg-cyber-gray text-gray-300 hover:bg-cyber-gray-light'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Report
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="cyber-card">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-cyber-blue" size={24} />
            <span className="text-sm text-green-400">+12%</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">247</div>
          <div className="text-sm text-gray-400">Total Threats</div>
        </div>
        <div className="cyber-card">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="text-cyber-red" size={24} />
            <span className="text-sm text-cyber-red">+8%</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">12</div>
          <div className="text-sm text-gray-400">Critical Alerts</div>
        </div>
        <div className="cyber-card">
          <div className="flex items-center justify-between mb-2">
            <PieChartIcon className="text-green-400" size={24} />
            <span className="text-sm text-green-400">+15%</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">1,234</div>
          <div className="text-sm text-gray-400">Threats Blocked</div>
        </div>
        <div className="cyber-card">
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-yellow-400" size={24} />
            <span className="text-sm text-green-400">+3%</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">87.5</div>
          <div className="text-sm text-gray-400">Avg AI Score</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Trends */}
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-white mb-4">Threat Trends Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockThreatTrends}>
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
              <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2} />
              <Line type="monotone" dataKey="malware" stroke="#ff006e" strokeWidth={2} />
              <Line type="monotone" dataKey="phishing" stroke="#ff6b35" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Types */}
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

        {/* Affected Industries */}
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-white mb-4">Affected Industries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockIndustries}>
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
              <Bar dataKey="value" fill="#00d4ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Activity Heatmap */}
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-white mb-4">Threat Activity by Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockThreatTrends}>
              <defs>
                <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
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
              <Area type="monotone" dataKey="value" stroke="#00d4ff" fillOpacity={1} fill="url(#colorActivity)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Report Table */}
      {reportType === 'detailed' && (
        <div className="cyber-card">
          <h3 className="text-xl font-bold text-white mb-4">Detailed Threat Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyber-gray-light">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Threat ID</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Severity</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">AI Score</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {mockThreatTrends.map((item, index) => (
                  <tr key={index} className="border-b border-cyber-gray-light hover:bg-cyber-gray-light transition-colors">
                    <td className="py-3 px-4 text-white">THREAT-{String(index + 1).padStart(4, '0')}</td>
                    <td className="py-3 px-4 text-cyber-blue">Malware</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-cyber-red/20 text-cyber-red rounded text-xs font-semibold">
                        CRITICAL
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white font-semibold">{Math.floor(Math.random() * 30) + 70}</td>
                    <td className="py-3 px-4 text-gray-400">{new Date().toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;


