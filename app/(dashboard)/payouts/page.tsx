'use client';

import React from 'react';

import {ConnectPayouts} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Payouts() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payouts</h1>
      </div>
      <Container>
        <h1 className="ml-1 text-xl font-bold">Recent payouts</h1>
        <EmbeddedComponentContainer>
          <ConnectPayouts />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
