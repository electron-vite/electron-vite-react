import React from 'react';

const CalendarPanel: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-gray-900 border-l border-gray-700">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-200">Calendar</h2>
            </div>
            <div className="flex-1 bg-white">
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York"
                    style={{ border: 0 }}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    title="Google Calendar"
                ></iframe>
            </div>
        </div>
    );
};

export default CalendarPanel;
