
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  ShoppingCart, 
  Calendar, 
  AlertTriangle, 
  Plus, 
  FileText, 
  Users,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface DashboardProps {
  userRole: 'admin' | 'manager' | 'collaborator';
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  // Mock data
  const summaryData = {
    activeSites: 12,
    pendingOrders: 8,
    upcomingMeetings: 3,
    checkInReminders: 5
  };

  const kanbanData = {
    toStart: [
      { id: 1, name: 'Residential Complex A', client: 'ABC Corp', progress: 0 },
      { id: 2, name: 'Office Building B', client: 'XYZ Ltd', progress: 0 }
    ],
    inProgress: [
      { id: 3, name: 'Shopping Mall C', client: 'Mall Corp', progress: 45 },
      { id: 4, name: 'Warehouse D', client: 'Storage Inc', progress: 78 },
      { id: 5, name: 'School Building E', client: 'Education Board', progress: 23 }
    ],
    paused: [
      { id: 6, name: 'Hospital Wing F', client: 'Health System', progress: 60 }
    ],
    completed: [
      { id: 7, name: 'Retail Store G', client: 'Fashion Brand', progress: 100 },
      { id: 8, name: 'Community Center H', client: 'City Council', progress: 100 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'toStart': return 'bg-gray-100 text-gray-700';
      case 'inProgress': return 'bg-blue-100 text-blue-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'toStart': return 'To Start';
      case 'inProgress': return 'In Progress';
      case 'paused': return 'Paused';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            New Note
          </Button>
          <Button size="sm" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            New Meeting
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Site
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.activeSites}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 inline mr-1 text-yellow-500" />
              3 overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.upcomingMeetings}</div>
            <p className="text-xs text-muted-foreground">
              <Clock className="h-3 w-3 inline mr-1" />
              Next: Today 2:00 PM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-in Reminders</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.checkInReminders}</div>
            <p className="text-xs text-muted-foreground">
              <Users className="h-3 w-3 inline mr-1" />
              Across 3 sites
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
          <CardDescription>
            Drag and drop sites between columns to update their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(kanbanData).map(([status, sites]) => (
              <div key={status} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(status)}>
                    {getStatusLabel(status)} ({sites.length})
                  </Badge>
                </div>
                <div className="space-y-3">
                  {sites.map((site) => (
                    <Card key={site.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">{site.name}</h4>
                        <p className="text-xs text-gray-600">{site.client}</p>
                        {status !== 'toStart' && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{site.progress}%</span>
                            </div>
                            <Progress value={site.progress} className="h-2" />
                          </div>
                        )}
                        {status === 'completed' && (
                          <div className="flex items-center text-green-600 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Site inspection completed', site: 'Shopping Mall C', time: '2 hours ago' },
                { action: 'Order delivered', item: 'Steel beams for Warehouse D', time: '4 hours ago' },
                { action: 'New meeting scheduled', client: 'ABC Corp', time: '1 day ago' },
                { action: 'Progress updated', site: 'School Building E', time: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.site || activity.item || activity.client}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: 'Foundation inspection', site: 'Residential Complex A', date: 'Dec 22, 2024' },
                { task: 'Material delivery', site: 'Office Building B', date: 'Dec 24, 2024' },
                { task: 'Client meeting', site: 'Shopping Mall C', date: 'Dec 26, 2024' },
                { task: 'Final walkthrough', site: 'Retail Store G', date: 'Dec 28, 2024' }
              ].map((deadline, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{deadline.task}</p>
                    <p className="text-xs text-gray-600">{deadline.site}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {deadline.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
