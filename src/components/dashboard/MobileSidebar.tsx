"use client";

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from './Sidebar';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 !h-screen !max-h-screen overflow-y-auto">
        <div className="h-full bg-gray-900">
          <Sidebar 
            className="relative border-0" 
            isCollapsed={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
