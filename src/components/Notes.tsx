
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Plus, 
  User, 
  Calendar, 
  Building2, 
  Edit, 
  Trash2,
  Tag,
  Clock,
  Users
} from 'lucide-react';

interface NotesProps {
  userRole: 'admin' | 'manager' | 'collaborator';
}

const Notes: React.FC<NotesProps> = ({ userRole }) => {
  const [filterSite, setFilterSite] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);

  // Mock data
  const notes = [
    {
      id: 1,
      title: 'Foundation Inspection Results',
      content: 'Foundation inspection completed successfully. All concrete work meets specifications. Minor surface cracks noted in section B2 - scheduled for repair next week.',
      site: 'Shopping Mall C',
      author: 'John Smith',
      contributors: ['Sarah Johnson', 'Mike Davis'],
      tags: ['inspection', 'foundation', 'urgent'],
      createdAt: '2024-01-10T09:30:00Z',
      updatedAt: '2024-01-12T14:15:00Z',
      lastModifiedBy: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Client Meeting Summary - ABC Corp',
      content: 'Discussed timeline adjustments for Residential Complex A. Client approved additional budget for upgraded materials. New completion date: March 15, 2024.',
      site: 'Residential Complex A',
      author: 'Emily Chen',
      contributors: ['John Smith'],
      tags: ['meeting', 'client', 'timeline'],
      createdAt: '2024-01-08T16:45:00Z',
      updatedAt: '2024-01-08T16:45:00Z',
      lastModifiedBy: 'Emily Chen'
    },
    {
      id: 3,
      title: 'Material Quality Issues',
      content: 'Received substandard steel beams from supplier. Returned entire shipment. Alternative supplier contacted - delivery expected by Jan 20th.',
      site: 'Office Building B',
      author: 'Mike Davis',
      contributors: [],
      tags: ['materials', 'quality', 'urgent'],
      createdAt: '2024-01-05T11:20:00Z',
      updatedAt: '2024-01-07T09:10:00Z',
      lastModifiedBy: 'Mike Davis'
    },
    {
      id: 4,
      title: 'Safety Protocol Update',
      content: 'New safety protocols implemented across all sites. All team members completed training. Updated hard hat requirements and emergency procedures.',
      site: 'Multiple Sites',
      author: 'David Wilson',
      contributors: ['Lisa Brown', 'Emily Chen', 'John Smith'],
      tags: ['safety', 'training', 'protocol'],
      createdAt: '2024-01-03T08:00:00Z',
      updatedAt: '2024-01-04T12:30:00Z',
      lastModifiedBy: 'Lisa Brown'
    },
    {
      id: 5,
      title: 'Progress Review - Warehouse D',
      content: 'Weekly progress review completed. 23% of project finished. Electrical work ahead of schedule, plumbing slightly behind due to permit delays.',
      site: 'Warehouse D',
      author: 'Lisa Brown',
      contributors: ['Mike Davis'],
      tags: ['progress', 'review', 'electrical', 'plumbing'],
      createdAt: '2024-01-01T15:45:00Z',
      updatedAt: '2024-01-02T10:20:00Z',
      lastModifiedBy: 'Mike Davis'
    }
  ];

  const sites = ['Shopping Mall C', 'Residential Complex A', 'Office Building B', 'Multiple Sites', 'Warehouse D'];
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSiteFilter = filterSite === 'all' || note.site === filterSite;
    const matchesTagFilter = filterTag === 'all' || note.tags.includes(filterTag);
    return matchesSearch && matchesSiteFilter && matchesTagFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTagColor = (tag: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700',
      inspection: 'bg-blue-100 text-blue-700',
      meeting: 'bg-green-100 text-green-700',
      safety: 'bg-yellow-100 text-yellow-700',
      materials: 'bg-purple-100 text-purple-700',
      progress: 'bg-indigo-100 text-indigo-700',
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600">Collaborative notes for all your construction projects</p>
        </div>
        <Button onClick={() => setShowNewNote(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* New Note Form */}
      {showNewNote && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Enter note title..." />
              </div>
              <div>
                <label className="text-sm font-medium">Site</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select site" />
                  </SelectTrigger>
                  <SelectContent>
                    {sites.map(site => (
                      <SelectItem key={site} value={site}>{site}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea 
                placeholder="Write your note here..." 
                className="min-h-[120px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tags</label>
              <Input placeholder="Enter tags separated by commas..." />
            </div>
            <div className="flex space-x-2">
              <Button>Save Note</Button>
              <Button variant="outline" onClick={() => setShowNewNote(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes by title, content, or author..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={filterSite} onValueChange={setFilterSite}>
                <SelectTrigger className="w-[150px]">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  {sites.map(site => (
                    <SelectItem key={site} value={site}>{site}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-[150px]">
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {note.site}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {note.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {(userRole === 'admin' || note.author === 'Current User') && (
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{note.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} className={getTagColor(tag)}>
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Contributors and Last Modified */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    {note.contributors.length > 0 && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Contributors: {note.contributors.join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <Clock className="h-4 w-4 mr-1" />
                    Last modified by {note.lastModifiedBy} on {formatDate(note.updatedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notes;
