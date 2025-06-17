'use client'
import { useEffect, useState } from "react";
import { useSidebar } from "@/contexts/SidebarProvider";
import { Search, Bell, Truck, MapPin, Thermometer, MoreHorizontal, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

// Sample notifications data
const notificationsData = [
  {
    id: 1,
    type: 'alert',
    category: 'road',
    title: 'Heavy Rain Expected in Mumbai - Delays Likely',
    location: 'Western Line',
    time: '3 hrs ago',
    description: 'Affects pickup schedules across region.',
    priority: 'high'
  },
  {
    id: 2,
    type: 'info',
    category: 'cfs',
    title: 'New CFS Opened: Pune CFS Hub now operational',
    location: 'Pune, Maharashtra',
    time: '6 hrs ago',
    description: 'Now accepting bookings.',
    priority: 'normal'
  },
  {
    id: 3,
    type: 'caution',
    category: 'road',
    title: 'Roadblock: NH48 under maintenance',
    location: 'Between Surat & Vadodara',
    time: '18 hrs ago',
    description: 'Expect delays in freight movement.',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'info',
    category: 'climate',
    title: 'Climate Normalized in Chennai Zone',
    location: 'Chennai, TN',
    time: '1 day ago',
    description: 'All routes functioning normally.',
    priority: 'normal'
  }
];

const filterButtons = [
  { key: 'all', label: 'All', icon: Bell },
  { key: 'cfs', label: 'CFS', icon: Truck },
  { key: 'road', label: 'Road', icon: MapPin },
  { key: 'climate', label: 'Climate', icon: Thermometer },
  { key: 'others', label: 'Others', icon: MoreHorizontal }
];

const NotificationCard = ({ notification }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'alert':
        return 'border-l-red-500 bg-red-50';
      case 'caution':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getTypeIndicator = (type) => {
    switch (type) {
      case 'alert':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      case 'caution':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'info':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'High Alert';
      case 'medium':
        return 'Caution';
      case 'normal':
        return 'Info';
      default:
        return 'Info';
    }
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 mb-4 ${getTypeColor(notification.type)} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {getTypeIndicator(notification.type)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {getPriorityLabel(notification.priority)}
              </span>
            </div>
            <h3 className="font-semibold text-[var(--foreground)] mb-2">
              {notification.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-[var(--secondary)] mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {notification.location}
              </span>
              <span>{notification.time}</span>
            </div>
            <p className="text-sm text-[var(--secondary)]">
              {notification.description}
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-1 text-xs text-[var(--primary)] hover:text-[var(--light-primary)] mt-3 transition-colors"
      >
        <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        View Details
      </button>
      
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-[var(--secondary)]">
            Additional details and updates would be displayed here. This could include more specific information about the notification, affected routes, expected resolution times, or alternative recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default function NotificationsUpdatesPage() {

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState(notificationsData);

 const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Notifications & Updates')
	}, []);

  useEffect(() => {
    let filtered = notificationsData;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(notification => 
        notification.category === activeFilter
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [activeFilter, searchQuery]);

  const getDateSection = (timeAgo) => {
    if (timeAgo.includes('hrs ago') || timeAgo.includes('hr ago')) {
      return 'Today';
    } else if (timeAgo.includes('day ago') || timeAgo.includes('days ago')) {
      return 'Yesterday';
    }
    return 'Earlier';
  };

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const section = getDateSection(notification.time);
    if (!groups[section]) {
      groups[section] = [];
    }
    groups[section].push(notification);
    return groups;
  }, {});

  return (
    <section className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          Notifications & Updates
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterButtons.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? 'bg-[var(--primary)] text-white shadow-md'
                    : 'bg-[var(--accent)] text-[var(--foreground)] hover:bg-[var(--background-2)]'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--secondary)] w-4 h-4" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--light-primary)] focus:border-transparent"
          />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 text-xs text-[var(--secondary)]">
          <span className="font-medium">Legend:</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Info</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Caution</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Alert</span>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
        {Object.keys(groupedNotifications).length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
              No notifications found
            </h3>
            <p className="text-[var(--secondary)]">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          Object.entries(groupedNotifications).map(([section, notifications]) => (
            <div key={section}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 text-[var(--primary)]">📅</div>
                <h2 className="text-sm font-medium text-[var(--foreground)]">
                  {section} - {new Date().toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
              </div>
              
              {notifications.map((notification) => (
                <NotificationCard 
                  key={notification.id} 
                  notification={notification} 
                />
              ))}
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredNotifications.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-[var(--primary)] hover:bg-[var(--light-primary)] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
            Load More Updates
          </button>
        </div>
      )}
    </section>
  );
}