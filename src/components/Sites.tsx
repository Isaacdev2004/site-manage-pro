
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Building2, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MapPin, 
  User, 
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

interface SitesProps {
  userRole: 'admin' | 'manager' | 'collaborator';
}

const Sites: React.FC<SitesProps> = ({ userRole }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const sites = [
    {
      id: 1,
      name: 'Residential Complex A',
      client: 'ABC Corporation',
      location: 'Downtown, City Center',
      status: 'To Start',
      progress: 0,
      manager: 'John Smith',
      startDate: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Shopping Mall C',
      client: 'Mall Corporation',
      location: 'Westside Plaza',
      status: 'In Progress',
      progress: 45,
      manager: 'Sarah Johnson',
      startDate: '2023-09-20',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Office Building B',
      client: 'XYZ Limited',
      location: 'Business District',
      status: 'In Progress',
      progress: 78,
      manager: 'Mike Davis',
      startDate: '2023-11-10',
      image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Hospital Wing F',
      client: 'Health System',
      location: 'Medical Center',
      status: 'Paused',
      progress: 60,
      manager: 'Emily Chen',
      startDate: '2023-08-05',
      image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Retail Store G',
      client: 'Fashion Brand',
      location: 'Shopping Center',
      status: 'Completed',
      progress: 100,
      manager: 'David Wilson',
      startDate: '2023-06-01',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      name: 'Warehouse D',
      client: 'Storage Inc',
      location: 'Industrial Zone',
      status: 'In Progress',
      progress: 23,
      manager: 'Lisa Brown',
      startDate: '2023-12-01',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Start': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Paused': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || site.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSites.map((site) => (
        <Card key={site.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={site.image} 
              alt={site.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{site.name}</CardTitle>
                <CardDescription>{site.client}</CardDescription>
              </div>
              <Badge className={getStatusColor(site.status)}>
                {site.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {site.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {site.manager}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Started: {site.startDate}
              </div>
              {site.status !== 'To Start' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{site.progress}%</span>
                  </div>
                  <Progress value={site.progress} className="h-2" />
                </div>
              )}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                {(userRole === 'admin' || userRole === 'manager') && (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {userRole === 'admin' && (
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredSites.map((site) => (
        <Card key={site.id}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <img 
                src={site.image} 
                alt={site.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {site.name}
                  </h3>
                  <Badge className={getStatusColor(site.status)}>
                    {site.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{site.client}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {site.location}
                  </span>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {site.manager}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {site.startDate}
                  </span>
                </div>
                {site.status !== 'To Start' && (
                  <div className="mt-3 w-full max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{site.progress}%</span>
                    </div>
                    <Progress value={site.progress} className="h-2" />
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                {(userRole === 'admin' || userRole === 'manager') && (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {userRole === 'admin' && (
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Construction Sites</h1>
          <p className="text-gray-600">Manage and monitor all your construction projects</p>
        </div>
        {(userRole === 'admin' || userRole === 'manager') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Site
          </Button>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search sites by name or client..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="To Start">To Start</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex rounded-md border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sites Display */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {filteredSites.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sites found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Sites;
