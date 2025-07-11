import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Gift, LogOut, User, Search, Filter, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockUsers, mockTransactions } from '../data/mockData';
import Button from './Button';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'transactions' | 'analytics' | 'branch' | 'withdrawals'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || user.role !== 'admin') return null;

  const totalUsers = mockUsers.filter(u => u.role === 'user').length;
  const totalRevenue = mockUsers.reduce((sum, u) => sum + u.totalSpent, 0);
  const totalCoinsDistributed = mockUsers.reduce((sum, u) => sum + u.coins, 0);
  const totalCoupons = mockUsers.reduce((sum, u) => sum + u.coupons.length, 0);

  const filteredUsers = mockUsers.filter(u => 
    u.role === 'user' && 
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Mock withdrawal data
  const withdrawalRequests = [
    {
      id: 'w1',
      userId: '2',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      currentStock: 1250,
      withdrawalAmount: 500,
      requestDate: '2024-01-25T10:30:00Z',
      status: 'pending'
    },
    {
      id: 'w2',
      userId: '3',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      currentStock: 2100,
      withdrawalAmount: 800,
      requestDate: '2024-01-24T14:15:00Z',
      status: 'approved'
    }
  ];

  const handleWithdrawalAction = (withdrawalId: string, action: 'approve' | 'reject') => {
    console.log(`${action} withdrawal ${withdrawalId}`);
    // Implementation would update the withdrawal status
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'withdrawals', label: 'Withdrawal & Stock', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: Filter },
    { id: 'branch', label: 'Branch', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Admin</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-300">Administrator</div>
                <div className="font-semibold text-white">{user.name}</div>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Total Users</p>
                        <p className="text-3xl font-bold text-white">{totalUsers}</p>
                      </div>
                      <Users className="w-10 h-10 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Total Revenue</p>
                        <p className="text-3xl font-bold text-white">₹{totalRevenue}</p>
                      </div>
                      <DollarSign className="w-10 h-10 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Coins Distributed</p>
                        <p className="text-3xl font-bold text-white">{totalCoinsDistributed}</p>
                      </div>
                      <TrendingUp className="w-10 h-10 text-yellow-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Total Redeem</p>
                        <p className="text-3xl font-bold text-white">{totalCoupons}</p>
                      </div>
                      <Gift className="w-10 h-10 text-purple-400" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {mockUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center space-x-4 py-3 border-b border-white/10 last:border-b-0">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-2">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-300">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">{user.coins} coins</p>
                          <p className="text-xs text-gray-300">₹{user.totalSpent} spent</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">User Management</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4 font-medium text-gray-300">User</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Stock</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-white">{user.name}</p>
                                <p className="text-sm text-gray-300">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-white">{user.coins}</td>
                            <td className="py-4 px-4 text-white">₹{user.totalSpent}</td>
                            <td className="py-4 px-4 text-gray-300">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => {
                      const user = mockUsers.find(u => u.id === transaction.userId);
                      return (
                        <div key={transaction.id} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-white">
                                {user?.name || 'Unknown User'}
                              </p>
                              <p className="text-gray-300 text-sm">
                                {transaction.type === 'purchase' ? 'Coin Purchase' : 'Coupon Generation'} • 
                                {new Date(transaction.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-white">₹{transaction.amount}</p>
                              <p className="text-sm text-green-400">+{transaction.coins} coins</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'withdrawals' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Withdrawal & Stock Management</h3>
                  
                  {/* Summary Cards */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">
                          {withdrawalRequests.filter(w => w.status === 'pending').length}
                        </div>
                        <div className="text-gray-300 text-sm">Pending Requests</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">
                          ₹{withdrawalRequests.reduce((sum, w) => sum + w.withdrawalAmount, 0)}
                        </div>
                        <div className="text-gray-300 text-sm">Total Withdrawal Amount</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">
                          ₹{withdrawalRequests.reduce((sum, w) => sum + w.currentStock, 0)}
                        </div>
                        <div className="text-gray-300 text-sm">Total User Stock</div>
                      </div>
                    </div>
                  </div>

                  {/* Withdrawal Requests Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4 font-medium text-gray-300">User</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Current Stock</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Withdrawal Request</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Request Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawalRequests.map((request) => (
                          <tr key={request.id} className="border-b border-white/10 hover:bg-white/5">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-white">{request.userName}</p>
                                <p className="text-sm text-gray-300">{request.userEmail}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-white">₹{request.currentStock}</td>
                            <td className="py-4 px-4 text-yellow-400 font-semibold">₹{request.withdrawalAmount}</td>
                            <td className="py-4 px-4 text-gray-300">
                              {new Date(request.requestDate).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                request.status === 'pending' 
                                  ? 'bg-yellow-600 text-white' 
                                  : request.status === 'approved'
                                  ? 'bg-green-600 text-white'
                                  : 'bg-red-600 text-white'
                              }`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              {request.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <Button
                                    onClick={() => handleWithdrawalAction(request.id, 'approve')}
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    onClick={() => handleWithdrawalAction(request.id, 'reject')}
                                    size="sm"
                                    variant="danger"
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">User Growth</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">This Month</span>
                        <span className="text-white font-semibold">+{Math.floor(totalUsers * 0.3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Last Month</span>
                        <span className="text-white font-semibold">+{Math.floor(totalUsers * 0.4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Growth Rate</span>
                        <span className="text-green-400 font-semibold">+15%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Analytics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Average per User</span>
                        <span className="text-white font-semibold">₹{(totalRevenue / totalUsers).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Monthly Recurring</span>
                        <span className="text-white font-semibold">₹{(totalRevenue * 0.3).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Conversion Rate</span>
                        <span className="text-green-400 font-semibold">
                          {((mockUsers.filter(u => u.totalSpent > 0).length / totalUsers) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Platform Insights</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {Math.round((mockUsers.filter(u => u.coupons.some(c => !c.isUsed)).length / totalUsers) * 100)}%
                      </div>
                      <div className="text-gray-300 text-sm">Users with Active Coupons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {Math.round(mockUsers.reduce((sum, u) => sum + u.coupons.filter(c => c.isUsed).length, 0) / totalCoupons * 100)}%
                      </div>
                      <div className="text-gray-300 text-sm">Coupon Redemption Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {(totalCoinsDistributed / totalUsers).toFixed(0)}
                      </div>
                      <div className="text-gray-300 text-sm">Avg Coins per User</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branch' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Branch Management</h3>
                  
                  {/* Branch Stats */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">5</div>
                        <div className="text-gray-300 text-sm">Active Branches</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">125</div>
                        <div className="text-gray-300 text-sm">Branch Users</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">₹45,000</div>
                        <div className="text-gray-300 text-sm">Branch Revenue</div>
                      </div>
                    </div>
                  </div>

                  {/* Branch List */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Branch Locations</h4>
                    {[
                      { id: 1, name: 'Mumbai Central', users: 35, revenue: 15000, status: 'active' },
                      { id: 2, name: 'Delhi North', users: 28, revenue: 12000, status: 'active' },
                      { id: 3, name: 'Bangalore Tech', users: 42, revenue: 18000, status: 'active' },
                      { id: 4, name: 'Chennai Marina', users: 20, revenue: 8000, status: 'pending' }
                    ].map((branch) => (
                      <div key={branch.id} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold text-white">{branch.name}</h5>
                            <p className="text-gray-300 text-sm">
                              {branch.users} users • ₹{branch.revenue} revenue
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              branch.status === 'active' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {branch.status}
                            </span>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;