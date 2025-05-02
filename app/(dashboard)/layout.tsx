'use client';
import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';

import {EmbeddedComponentWrapper} from '@/app/hooks/EmbeddedComponentWrapper';
import Screen from '../components/Screen';
import * as React from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedAndOnboardedRoute>
      <EmbeddedComponentWrapper>
        <Screen>{children}</Screen>
      </EmbeddedComponentWrapper>
    </AuthenticatedAndOnboardedRoute>
  );
}
