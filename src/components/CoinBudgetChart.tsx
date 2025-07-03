import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CoinBudgetData {
  id: string;
  name: string;
  data: {
    '2Years': number;
    '1Year': number;
    '6Months': number;
    '1Month': number;
    'Current': number;
  };
  color: string;
  icon: string;
}

const CoinBudgetChart: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('all');

  const coinBudgetData: CoinBudgetData[] = [
    {
      id: 'silver',
      name: 'Silver',
      data: {
        '2Years': 35,
        '1Year': 55,
        '6Months': 80,
        '1Month': 100,
        'Current': 120
      },
      color: '#9CA3AF',
      icon: '🥈'
    },
    {
      id: 'gold18k',
      name: '18K Gold',
      data: {
        '2Years': 35,
        '1Year': 55,
        '6Months': 80,
        '1Month': 100,
        'Current': 150
      },
      color: '#F59E0B',
      icon: '🥇'
    },
    {
      id: 'gold24k',
      name: '24K Gold',
      data: {
        '2Years': 35,
        '1Year': 55,
        '6Months': 80,
        '1Month': 100,
        'Current': 180
      },
      color: '#F97316',
      icon: '👑'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      data: {
        '2Years': 35,
        '1Year': 55,
        '6Months': 80,
        '1Month': 100,
        'Current': 250
      },
      color: '#06B6D4',
      icon: '💎'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      data: {
        '2Years': 35,
        '1Year': 55,
        '6Months': 80,
        '1Month': 100,
        'Current': 300
      },
      color: '#8B5CF6',
      icon: '⭐'
    },
    {
      id: 'palladium',
      name: 'Palladium',
      data: {
        '2Years': 35,
        '1Year': 55,
        '6Months': 80,
        '1Month': 100,
        'Current': 400
      },
      color: '#EC4899',
      icon: '🚀'
    }
  ];

  const timeLabels = ['2 Years Ago', '1 Year Ago', '6 Months Ago', '1 Month Ago', 'Current'];
  const dataKeys = ['2Years', '1Year', '6Months', '1Month', 'Current'] as const;

  const filteredCoins = selectedCoin === 'all' ? coinBudgetData : coinBudgetData.filter(coin => coin.id === selectedCoin);

  const createPath = (coin: CoinBudgetData) => {
    const width = 600;
    const height = 200;
    const maxValue = Math.max(...coinBudgetData.flatMap(c => Object.values(c.data)));
    
    const points = dataKeys.map((key, index) => {
      const x = (index / (dataKeys.length - 1)) * width;
      const y = height - (coin.data[key] / maxValue) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const createGradientPath = (coin: CoinBudgetData) => {
    const path = createPath(coin);
    const width = 600;
    const height = 200;
    
    return `${path} L ${width},${height} L 0,${height} Z`;
  };

  const calculateGrowth = (coin: CoinBudgetData) => {
    const oldValue = coin.data['2Years'];
    const newValue = coin.data['Current'];
    return ((newValue - oldValue) / oldValue) * 100;
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Coin Budget History</h2>
          <p className="text-gray-300">Historical budget data across different time periods</p>
        </div>
        
        {/* Coin Filter */}
        <div className="mt-4 md:mt-0">
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Coins</option>
            {coinBudgetData.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.icon} {coin.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 bg-black/20 rounded-lg overflow-hidden mb-6">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 200"
          className="absolute inset-0"
        >
          {/* Grid Lines */}
          <defs>
            {filteredCoins.map((coin, index) => (
              <linearGradient key={coin.id} id={`gradient-${coin.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={coin.color} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={coin.color} stopOpacity="0"/>
              </linearGradient>
            ))}
            <pattern id="grid" width="120" height="40" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart Lines and Areas */}
          {filteredCoins.map((coin, index) => (
            <g key={coin.id}>
              {/* Area Fill */}
              <path
                d={createGradientPath(coin)}
                fill={`url(#gradient-${coin.id})`}
              />
              
              {/* Line */}
              <path
                d={createPath(coin)}
                fill="none"
                stroke={coin.color}
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              
              {/* Data Points */}
              {dataKeys.map((key, pointIndex) => {
                const width = 600;
                const height = 200;
                const maxValue = Math.max(...coinBudgetData.flatMap(c => Object.values(c.data)));
                const x = (pointIndex / (dataKeys.length - 1)) * width;
                const y = height - (coin.data[key] / maxValue) * height;
                
                return (
                  <circle
                    key={`${coin.id}-${pointIndex}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={coin.color}
                    className="animate-pulse"
                  />
                );
              })}
            </g>
          ))}
        </svg>
        
        {/* X-axis Labels */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
          {timeLabels.map((label, index) => (
            <div key={index} className="text-xs text-gray-400 text-center">
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Coin Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {coinBudgetData.map((coin) => {
          const growth = calculateGrowth(coin);
          const isPositive = growth >= 0;
          
          return (
            <div
              key={coin.id}
              className={`bg-white/10 backdrop-blur-lg rounded-lg p-4 border transition-all duration-200 ${
                selectedCoin === coin.id || selectedCoin === 'all'
                  ? 'border-white/20 hover:border-white/40'
                  : 'border-white/10 opacity-50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{coin.icon}</div>
                <div className="text-sm font-medium text-white mb-1">{coin.name}</div>
                <div className="text-lg font-bold text-white mb-1">₹{coin.data.Current}</div>
                <div className={`flex items-center justify-center space-x-1 text-xs ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{isPositive ? '+' : ''}{growth.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {filteredCoins.map((coin) => (
          <div key={coin.id} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: coin.color }}
            ></div>
            <span className="text-sm text-gray-300">{coin.icon} {coin.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinBudgetChart;