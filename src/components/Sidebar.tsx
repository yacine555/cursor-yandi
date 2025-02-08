'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  BeakerIcon,
  DocumentTextIcon,
  CommandLineIcon,
  DocumentIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: 'Overview', path: '/dashboards', icon: HomeIcon },
    {
      name: 'My Account',
      path: '/account',
      icon: UserIcon,
      submenu: true,
    },
    {
      name: 'Research Assistant',
      path: '/assistant',
      icon: BeakerIcon,
    },
    {
      name: 'Research Reports',
      path: '/reports',
      icon: DocumentTextIcon,
    },
    {
      name: 'API Playground',
      path: '/playground',
      icon: CommandLineIcon,
    },
    {
      name: 'Documentation',
      path: '/docs',
      icon: DocumentIcon,
      external: true,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-black shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
      >
        {isCollapsed ? (
          <Bars3Icon className="w-6 h-6" />
        ) : (
          <XMarkIcon className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex fixed top-4 left-64 z-50 -ml-4 p-2 rounded-full bg-white dark:bg-black shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transform transition-all duration-300 ease-in-out"
        style={{
          left: isCollapsed ? '76px' : '256px',
        }}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="w-4 h-4" />
        ) : (
          <ChevronLeftIcon className="w-4 h-4" />
        )}
      </button>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen z-40
        transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black
        lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        {/* Logo */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/yandi-logo.svg"
              alt="yandi"
              width={120}
              height={30}
              className={isCollapsed ? 'lg:w-8' : ''}
            />
          </Link>
        </div>

        {/* Personal Section */}
        <div className="px-4 py-2">
          <div className={`text-sm text-gray-500 px-2 mb-2 ${isCollapsed ? 'lg:hidden' : ''}`}>
            Personal
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.external ? `https://docs.tavily.com` : item.path}
              target={item.external ? "_blank" : undefined}
              className={`flex items-center gap-2 px-4 py-2 my-1 rounded-lg text-sm ${
                isActive(item.path)
                  ? 'bg-black/[.05] dark:bg-white/[.06] font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-black/[.03] dark:hover:bg-white/[.03]'
              }`}
              title={item.name}
            >
              <item.icon className="w-5 h-5" />
              <span className={isCollapsed ? 'lg:hidden' : ''}>
                {item.name}
              </span>
              {!isCollapsed && item.submenu && (
                <svg
                  className="ml-auto w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
              {!isCollapsed && item.external && (
                <svg
                  className="ml-auto w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Section - Yacine */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
              Y
            </div>
            <span className={`font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>
              Yacine
            </span>
            <svg
              className={`ml-auto w-4 h-4 ${isCollapsed ? 'lg:hidden' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 