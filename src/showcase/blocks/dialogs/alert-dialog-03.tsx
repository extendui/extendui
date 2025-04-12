'use client';

import { BellRing, X, Clock, Check } from 'lucide-react';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  sender: {
    name: string;
    initials: string;
  };
  message: string;
  time: string;
  read: boolean;
}

export function AlertDialog03() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      sender: {
        name: 'John Doe',
        initials: 'JD',
      },
      message: 'Hey, can we discuss the project timeline?',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      sender: {
        name: 'Alice Smith',
        initials: 'AS',
      },
      message: "I've uploaded the design files you requested",
      time: '10 minutes ago',
      read: false,
    },
    {
      id: '3',
      sender: {
        name: 'Robert Johnson',
        initials: 'RJ',
      },
      message: 'The client meeting has been rescheduled to tomorrow',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '4',
      sender: {
        name: 'Emily Davis',
        initials: 'ED',
      },
      message: 'Please review the latest changes to the documentation',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '5',
      sender: {
        name: 'Michael Wilson',
        initials: 'MW',
      },
      message: "Don't forget about our team meeting at 3 PM today",
      time: '3 hours ago',
      read: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button className="relative bg-indigo-500 pr-6 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700">
            <BellRing className="mr-1 h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md border-2 border-indigo-200 bg-white dark:border-indigo-900 dark:bg-gray-900">
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                <AlertDialogTitle className="dark:text-white">
                  Notifications
                </AlertDialogTitle>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:bg-black/50 dark:hover:text-indigo-300"
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <AlertDialogDescription className="dark:text-gray-400">
              You have {unreadCount} unread{' '}
              {unreadCount === 1 ? 'message' : 'messages'} from your team
              members.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-3 space-y-2">
            {notifications
              .slice(0, showAllNotifications ? notifications.length : 2)
              .map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-md p-3 transition-all duration-200',
                    notification.read
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'bg-indigo-50 shadow-sm dark:bg-indigo-900/40',
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-medium',
                      notification.read
                        ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        : 'bg-indigo-200 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300',
                    )}
                  >
                    {notification.sender.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        notification.read
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-900 dark:text-white',
                      )}
                    >
                      {notification.sender.name}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <div className="mt-1 flex items-center text-xs text-gray-400 dark:text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {notification.time}
                    </div>
                  </div>
                  {!notification.read && (
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                  )}
                </div>
              ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowAllNotifications(false);
              }}
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/40"
            >
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-800"
              onClick={() => {
                setShowAllNotifications(true);
                setIsDialogOpen(false);
                document.body.classList.add('overflow-hidden');
              }}
            >
              View All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 dark:bg-black/70',
          showAllNotifications
            ? 'opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <div
          className={cn(
            'fixed top-0 right-0 h-full w-full max-w-md transform shadow-lg transition-transform duration-300 ease-in-out',
            'border-l border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900',
            showAllNotifications ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                <h2 className="text-lg font-semibold dark:text-white">
                  All Notifications
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowAllNotifications(false);
                  document.body.classList.remove('overflow-hidden');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-indigo-800 flex-1 space-y-3 overflow-y-auto p-4">
              {notifications.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <BellRing className="mb-2 h-12 w-12 text-gray-300 dark:text-gray-700" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-lg p-4 transition-all duration-200',
                      notification.read
                        ? 'border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                        : 'border border-indigo-100 bg-indigo-50 shadow-sm dark:border-indigo-800 dark:bg-indigo-900/40',
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-medium',
                        notification.read
                          ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          : 'bg-indigo-200 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300',
                      )}
                    >
                      {notification.sender.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p
                          className={cn(
                            'text-sm font-medium',
                            notification.read
                              ? 'text-gray-700 dark:text-gray-300'
                              : 'text-gray-900 dark:text-white',
                          )}
                        >
                          {notification.sender.name}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.time}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {notification.message}
                      </p>

                      {notification.read && (
                        <div className="mt-2 flex items-center text-xs text-indigo-500 dark:text-indigo-400">
                          <Check className="mr-1 h-3 w-3" />
                          Read
                        </div>
                      )}
                    </div>
                    {!notification.read && (
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <Button
                className="w-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                onClick={() => {
                  markAllAsRead();
                  setShowAllNotifications(false);
                  document.body.classList.remove('overflow-hidden');
                }}
              >
                Mark All as Read
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
