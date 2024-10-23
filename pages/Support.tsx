import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Calendar, Users, Phone, HelpCircle } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

interface Message {
  message: string;
  time: string | Date;
  user: string;
}

const Support: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    socketRef.current = newSocket;

    // Listen for incoming messages
    newSocket.on('receive_message', (message: Message) => {
      if (message) {
        setChatMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() && socketRef.current) {
      const messageData: Message = {
        message: messageInput,
        time: new Date().toISOString(), // Use ISO format for proper date parsing
        user: 'Student', // Ideally, this would be dynamic
      };

      socketRef.current.emit('send_message', messageData);
      setMessageInput(''); // Clear input after sending
    }
  };

  const scheduleAppointment = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'counseling',
          date: new Date().toISOString(), // Use ISO format for date
          userId: '1', // Replace with actual user ID
        }),
      });

      if (response.ok) {
        alert('Appointment scheduled successfully!');
      } else {
        alert('Failed to schedule appointment.');
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('An error occurred while scheduling the appointment.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Support Banner */}
        <div className="bg-rose-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Phone className="h-8 w-8 text-rose-500" />
              <div>
                <h3 className="text-lg font-medium text-rose-800">24/7 Crisis Support</h3>
                <p className="text-rose-600">
                  Need immediate help? Call us at 1-800-WELLNESS or chat with a counselor now.
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/chat')}
              className="px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
            >
              Chat Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Support Services */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Support Services</h2>
            
            {/* Counseling Services */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-6 w-6 text-rose-500" />
                <h3 className="text-lg font-medium text-gray-900">Counseling Services</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Schedule a one-on-one session with our certified counselors.
              </p>
              <button
                onClick={scheduleAppointment}
                className="w-full px-4 py-2 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
              >
                Schedule Session
              </button>
            </div>

            {/* Peer Support */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-rose-500" />
                <h3 className="text-lg font-medium text-gray-900">Peer Support Groups</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Join our student-led support groups for various topics.
              </p>
              <button 
                onClick={() => navigate('/groups')}
                className="w-full px-4 py-2 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
              >
                Find a Group
              </button>
            </div>

            {/* Self-Help Resources */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <HelpCircle className="h-6 w-6 text-rose-500" />
                <h3 className="text-lg font-medium text-gray-900">Self-Help Resources</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Access our library of self-help guides and resources.
              </p>
              <button 
                onClick={() => navigate('/resources')}
                className="w-full px-4 py-2 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
              >
                Browse Resources
              </button>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <MessageCircle className="h-6 w-6 text-rose-500" />
              <h3 className="text-lg font-medium text-gray-900">Live Chat Support</h3>
            </div>

            <div className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      msg?.user === 'Student'
                        ? 'bg-rose-100 ml-auto'
                        : 'bg-gray-100'
                    } max-w-[80%]`}
                  >
                    <p className="text-sm text-gray-900">{msg?.message ?? 'No message'}</p>
                    <span className="text-xs text-gray-500">
                      {msg?.time ? new Date(msg.time).toLocaleTimeString() : 'Invalid time'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
