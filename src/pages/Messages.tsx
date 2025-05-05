import { useState } from 'react';
import { 
  Filter, Search, X, 
  Mail, MailOpen, Star, Trash2, Clock, Send, ChevronLeft
} from 'lucide-react';

interface MessageBase {
  id: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

interface InboxMessage extends MessageBase {
  from: string;
  starred: boolean;
  to?: never;
}

interface SentMessage extends MessageBase {
  to: string;
  from?: never;
  starred?: never;
}

type Message = InboxMessage | SentMessage;

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [folder, setFolder] = useState<'inbox' | 'sent' | 'starred' | 'drafts' | 'trash'>('inbox');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  // Mock data for messages with proper typing
  const messages: Record<typeof folder, Message[]> = {
    inbox: [
      {
        id: '1',
        from: 'John Doe',
        subject: 'Project Update: Q2 Results',
        body: 'Here are the latest results for our Q2 project. We exceeded our targets by 15%...',
        date: '2023-06-20T09:45:00',
        read: false,
        starred: true
      },
      {
        id: '2',
        from: 'Jane Smith',
        subject: 'Meeting Reminder',
        body: 'Just a reminder about our team meeting tomorrow at 10 AM...',
        date: '2023-06-19T14:30:00',
        read: true,
        starred: false
      },
      {
        id: '3',
        from: 'Mike Johnson',
        subject: 'Budget Approval',
        body: 'The budget for the new marketing campaign has been approved...',
        date: '2023-06-18T11:15:00',
        read: true,
        starred: false
      },
    ],
    sent: [
      {
        id: '4',
        to: 'Client A',
        subject: 'Proposal Submission',
        body: 'Attached is the proposal for your review. Please let me know if you have any questions...',
        date: '2023-06-17T16:20:00',
        read: true
      },
      {
        id: '5',
        to: 'Team Members',
        subject: 'Weekly Update',
        body: 'Here are the updates for this week. We have made significant progress on...',
        date: '2023-06-16T10:00:00',
        read: true
      }
    ],
    starred: [
      {
        id: '1',
        from: 'John Doe',
        subject: 'Project Update: Q2 Results',
        body: 'Here are the latest results for our Q2 project. We exceeded our targets by 15%...',
        date: '2023-06-20T09:45:00',
        read: false,
        starred: true
      }
    ],
    drafts: [],
    trash: []
  };

  // Filter messages with proper type checking
  const filteredMessages = messages[folder].filter(message => {
    const searchFields = folder === 'sent' 
      ? [message.to, message.subject, message.body]
      : [message.from, message.subject, message.body];
    
    return searchFields.some(field => 
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  // Toggle message selection
  const toggleMessageSelection = (id: string) => {
    setSelectedMessages(prev => 
      prev.includes(id) 
        ? prev.filter(msgId => msgId !== id) 
        : [...prev, id]
    );
  };

  // Toggle all messages selection
  const toggleAllMessagesSelection = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(msg => msg.id));
    }
  };

  // View message details
  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (folder === 'inbox' && !message.read) {
      // Mark as read in a real app would update the backend
      message.read = true;
    }
  };

  // Close message detail view
  const closeMessage = () => {
    setSelectedMessage(null);
  };

  // Start composing a new message
  const composeNewMessage = () => {
    setIsComposing(true);
    setSelectedMessage(null);
  };

  // Close compose view
  const closeCompose = () => {
    setIsComposing(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400">Communicate with your team and clients</p>
        </div>
        
        <button 
          className="btn-primary flex items-center gap-2 self-start"
          onClick={composeNewMessage}
        >
          <Send size={18} />
          <span>New Message</span>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 flex-1">
        {/* Sidebar */}
        <div className="w-full md:w-56 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm p-2">
            <button 
              onClick={() => {
                setFolder('inbox');
                setSelectedMessage(null);
                setIsComposing(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${folder === 'inbox' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Mail size={18} />
              <span>Inbox</span>
              <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {messages.inbox.filter(m => !m.read).length}
              </span>
            </button>
            
            <button 
              onClick={() => {
                setFolder('sent');
                setSelectedMessage(null);
                setIsComposing(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${folder === 'sent' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Send size={18} />
              <span>Sent</span>
            </button>
            
            <button 
              onClick={() => {
                setFolder('starred');
                setSelectedMessage(null);
                setIsComposing(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${folder === 'starred' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Star size={18} />
              <span>Starred</span>
            </button>
            
            <button 
              onClick={() => {
                setFolder('drafts');
                setSelectedMessage(null);
                setIsComposing(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${folder === 'drafts' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Clock size={18} />
              <span>Drafts</span>
              {messages.drafts.length > 0 && (
                <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-0.5 rounded-full">
                  {messages.drafts.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => {
                setFolder('trash');
                setSelectedMessage(null);
                setIsComposing(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${folder === 'trash' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Trash2 size={18} />
              <span>Trash</span>
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {isComposing ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm flex-1 flex flex-col">
              <div className="p-3 border-b border-border flex items-center gap-2">
                <button onClick={closeCompose} className="p-1 text-gray-500 hover:text-gray-700">
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-medium">New Message</h3>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="To" 
                    className="form-input w-full mb-2"
                  />
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="form-input w-full"
                  />
                </div>
                <textarea 
                  className="form-textarea flex-1 w-full" 
                  placeholder="Write your message here..."
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button className="btn-primary">Send</button>
                </div>
              </div>
            </div>
          ) : selectedMessage ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm flex-1 flex flex-col">
              <div className="p-3 border-b border-border flex items-center gap-2">
                <button onClick={closeMessage} className="p-1 text-gray-500 hover:text-gray-700">
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-medium">{selectedMessage.subject}</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">
                      {folder === 'sent' ? `To: ${selectedMessage.to}` : `From: ${selectedMessage.from}`}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(selectedMessage.date)}</p>
                  </div>
                  {folder === 'inbox' && 'starred' in selectedMessage && (
                    <button className="text-gray-400 hover:text-yellow-500">
                      <Star 
                        size={20} 
                        className={selectedMessage.starred ? 'fill-yellow-400 text-yellow-400' : ''} 
                      />
                    </button>
                  )}
                </div>
                <div className="prose dark:prose-invert">
                  {selectedMessage.body}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm flex-1 flex flex-col">
              {/* Toolbar */}
              <div className="p-3 border-b border-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={selectedMessages.length > 0 && selectedMessages.length === filteredMessages.length}
                      onChange={toggleAllMessagesSelection}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    
                    <div className="relative w-full md:w-80">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder={`Search ${folder}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input pl-9 w-full"
                      />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {selectedMessages.length > 0 && (
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                        <Trash2 size={18} />
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                      <Filter size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Messages list */}
              <div className="flex-1 overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  <div className="divide-y divide-border">
                    {filteredMessages.map((message) => (
                      <div 
                        key={message.id}
                        onClick={() => viewMessage(message)}
                        className={`p-4 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer ${
                          !message.read && folder === 'inbox' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={selectedMessages.includes(message.id)}
                            onChange={() => toggleMessageSelection(message.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          
                          {folder === 'inbox' && 'starred' in message && (
                            <button 
                              className="text-gray-400 hover:text-yellow-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                // In a real app, we would update the backend here
                                message.starred = !message.starred;
                              }}
                            >
                              <Star 
                                size={18} 
                                className={message.starred ? 'fill-yellow-400 text-yellow-400' : ''} 
                              />
                            </button>
                          )}
                          
                          {folder === 'inbox' ? (
                            message.read ? (
                              <MailOpen size={18} className="text-gray-400" />
                            ) : (
                              <Mail size={18} className="text-blue-500" />
                            )
                          ) : (
                            <Send size={18} className="text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className={`font-medium truncate ${
                              !message.read && folder === 'inbox' 
                                ? 'text-gray-900 dark:text-gray-100' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {folder === 'sent' ? message.to : message.from}
                            </h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatDate(message.date)}
                            </span>
                          </div>
                          
                          <h4 className={`truncate mb-1 ${
                            !message.read && folder === 'inbox' ? 'font-semibold' : 'font-medium'
                          }`}>
                            {message.subject}
                          </h4>
                          
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {message.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-8 text-center text-gray-500 dark:text-gray-400">
                    <div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 inline-flex">
                        {folder === 'inbox' ? (
                          <Mail size={24} className="text-gray-400" />
                        ) : folder === 'sent' ? (
                          <Send size={24} className="text-gray-400" />
                        ) : folder === 'starred' ? (
                          <Star size={24} className="text-gray-400" />
                        ) : folder === 'drafts' ? (
                          <Clock size={24} className="text-gray-400" />
                        ) : (
                          <Trash2 size={24} className="text-gray-400" />
                        )}
                      </div>
                      <p className="font-medium mb-1">
                        {folder === 'inbox' 
                          ? 'No messages in your inbox' 
                          : folder === 'sent' 
                            ? 'No sent messages' 
                            : folder === 'starred'
                              ? 'No starred messages'
                              : folder === 'drafts'
                                ? 'No draft messages'
                                : 'No messages in trash'}
                      </p>
                      <p className="text-sm">
                        {folder === 'inbox' 
                          ? 'Messages you receive will appear here' 
                          : folder === 'sent' 
                            ? 'Messages you send will appear here' 
                            : folder === 'starred'
                              ? 'Star important messages to find them easily'
                              : folder === 'drafts'
                                ? 'Save messages as drafts to finish later'
                                : 'Deleted messages will appear here'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;