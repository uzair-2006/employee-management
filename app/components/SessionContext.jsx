'use client'
import { SessionProvider } from "next-auth/react";

import React from 'react';

const SessionContext = ({ children }) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    );
}

export default SessionContext;
