
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Plus, 
  AlertTriangle, 
  Package, 
  Truck,
  CheckCircle,
  Calendar,
  Building2
} from 'lucide-react';

interface OrdersProps {
  userRole: 'admin' | 'manager' | 'collaborator';
}

const Orders: React.FC<OrdersProps> = ({ userRole }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSite, setFilterSite] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const orders = [
    {
      id: 'ORD-001',
      itemName: 'Steel Beams (Grade A)',
      supplier: 'MetalCorp Industries',
      quantity: '50 units',
      site: 'Shopping Mall C',
      status: 'To Order',
      estimatedDelivery: '2024-01-15',
      orderDate: '2024-01-01',
      totalAmount: '$25,000',
      isOverdue: false
    },
    {
      id: 'ORD-002',
      itemName: 'Concrete Mix (Premium)',
      supplier: 'BuildMix Co.',
      quantity: '200 bags',
      site: 'Office Building B',
      status: 'Ordered',
      estimatedDelivery: '2024-01-10',
      orderDate: '2023-12-20',
      totalAmount: '$8,500',
      isOverdue: false
    },
    {
      id: 'ORD-003',
      itemName: 'Window Frames (Aluminum)',
      supplier: 'GlassTech Solutions',
      quantity: '75 pieces',
      site: 'Residential Complex A',
      status: 'Received',
      estimatedDelivery: '2024-01-08',
      orderDate: '2023-12-15',
      totalAmount: '$15,750',
      isOverdue: false
    },
    {
      id: 'ORD-004',
      itemName: 'Electrical Cables',
      supplier: 'PowerLine Supplies',
      quantity: '500 meters',
      site: 'Hospital Wing F',
      status: 'Ordered',
      estimatedDelivery: '2023-12-30',
      orderDate: '2023-12-10',
      totalAmount: '$3,200',
      isOverdue: true
    },
    {
      id: 'ORD-005',
      itemName: 'Roofing Materials',
      supplier: 'TopCover Inc.',
      quantity: '100 sheets',
      site: 'Warehouse D',
      status: 'To Order',
      estimatedDelivery: '2024-01-20',
      orderDate: '2024-01-02',
      totalAmount: '$12,000',
      isOverdue: false
    },
    {
      id: 'ORD-006',
      itemName: 'Safety Equipment Set',
      supplier: 'SafeWork Pro',
      quantity: '25 sets',
      site: 'Retail Store G',
      status: 'Received',
      estimatedDelivery: '2024-01-05',
      orderDate: '2023-12-28',
      totalAmount: '$2,750',
      isOverdue: false
    }
  ];

  const sites = ['Shopping Mall C', 'Office Building B', 'Residential Complex A', 'Hospital Wing F', 'Warehouse D', 'Retail Store G'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'To Order': return <Package className="h-4 w-4" />;
      case 'Ordered': return <Truck className="h-4 w-4" />;
      case 'Received': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Order': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'Ordered': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Received': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter = filterStatus === 'all' || order.status === filterStatus;
    const matchesSiteFilter = filterSite === 'all' || order.site === filterSite;
    return matchesSearch && matchesStatusFilter && matchesSiteFilter;
  });

  const summaryStats = {
    toOrder: orders.filter(o => o.status === 'To Order').length,
    ordered: orders.filter(o => o.status === 'Ordered').length,
    received: orders.filter(o => o.status === 'Received').length,
    overdue: orders.filter(o => o.isOverdue).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders & Purchases</h1>
          <p className="text-gray-600">Track and manage all purchase orders for your construction sites</p>
        </div>
        {(userRole === 'admin' || userRole === 'manager') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Order</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.toOrder}</div>
            <p className="text-xs text-muted-foreground">
              Items waiting to be ordered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordered</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.ordered}</div>
            <p className="text-xs text-muted-foreground">
              Items in transit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Received</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.received}</div>
            <p className="text-xs text-muted-foreground">
              Items delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryStats.overdue}</div>
            <p className="text-xs text-muted-foreground">
              Items past delivery date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders by item, supplier, or ID..."
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
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="To Order">To Order</SelectItem>
                  <SelectItem value="Ordered">Ordered</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSite} onValueChange={setFilterSite}>
                <SelectTrigger className="w-[180px]">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  {sites.map(site => (
                    <SelectItem key={site} value={site}>{site}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>
            Complete list of all purchase orders with their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className={order.isOverdue ? 'bg-red-50' : ''}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {order.isOverdue && (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        {order.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.itemName}</div>
                        <div className="text-sm text-gray-600">Ordered: {order.orderDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {order.site}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {order.estimatedDelivery}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{order.totalAmount}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {(userRole === 'admin' || userRole === 'manager') && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
