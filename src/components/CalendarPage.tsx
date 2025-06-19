
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Building2,
  Truck,
  UserCheck
} from 'lucide-react';

interface CalendarPageProps {
  userRole: 'admin' | 'manager' | 'collaborator';
}

const CalendarPage: React.FC<CalendarPageProps> = ({ userRole }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [filterType, setFilterType] = useState<string>('all');

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Site Inspection - Shopping Mall C',
      type: 'inspection',
      date: '2024-01-15',
      time: '09:00 AM',
      location: 'Westside Plaza',
      attendees: ['John Smith', 'Site Team'],
      site: 'Shopping Mall C'
    },
    {
      id: 2,
      title: 'Client Meeting - ABC Corporation',
      type: 'meeting',
      date: '2024-01-15',
      time: '02:00 PM',
      location: 'ABC Corp Office',
      attendees: ['Sarah Johnson', 'ABC Corp Team'],
      site: 'Residential Complex A'
    },
    {
      id: 3,
      title: 'Material Delivery - Steel Beams',
      type: 'delivery',
      date: '2024-01-16',
      time: '11:00 AM',
      location: 'Office Building B',
      attendees: ['Mike Davis', 'Delivery Team'],
      site: 'Office Building B'
    },
    {
      id: 4,
      title: 'Team Standup Meeting',
      type: 'meeting',
      date: '2024-01-16',
      time: '09:00 AM',
      location: 'Main Office',
      attendees: ['All Team Members'],
      site: 'Multiple Sites'
    },
    {
      id: 5,
      title: 'Safety Inspection - Hospital Wing F',
      type: 'inspection',
      date: '2024-01-17',
      time: '10:30 AM',
      location: 'Medical Center',
      attendees: ['Emily Chen', 'Safety Inspector'],
      site: 'Hospital Wing F'
    },
    {
      id: 6,
      title: 'Progress Review - Warehouse D',
      type: 'meeting',
      date: '2024-01-18',
      time: '03:00 PM',
      location: 'Industrial Zone',
      attendees: ['Lisa Brown', 'Project Team'],
      site: 'Warehouse D'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'inspection': return <UserCheck className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'delivery': return <Truck className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'inspection': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'meeting': return 'bg-green-100 text-green-700 border-green-300';
      case 'delivery': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateString);
  };

  const todayEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Schedule and track all your construction project events</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="inspection">Inspections</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="delivery">Deliveries</SelectItem>
            </SelectContent>
          </Select>
          {(userRole === 'admin' || userRole === 'manager') && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          )}
        </div>
      </div>

      {/* View Mode Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            {['month', 'week', 'day'].map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Calendar View</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {selectedDate?.toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              
              {/* Event indicators for calendar could be added here */}
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Legend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Inspections
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    <Users className="h-3 w-3 mr-1" />
                    Meetings
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700">
                    <Truck className="h-3 w-3 mr-1" />
                    Deliveries
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events for Selected Date */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
              <CardDescription>
                {todayEvents.length} event{todayEvents.length !== 1 ? 's' : ''} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayEvents.length > 0 ? (
                  todayEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge className={getEventColor(event.type)}>
                          <div className="flex items-center space-x-1">
                            {getEventIcon(event.type)}
                            <span className="capitalize">{event.type}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Building2 className="h-3 w-3 mr-2" />
                          {event.site}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-2" />
                          {event.attendees.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No events scheduled for this date</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredEvents.slice(0, 4).map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
