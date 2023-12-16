'use client'

import { useSession } from 'next-auth/react';
import React from 'react';

const Dashboard = () => {
     const { data: session } = useSession();
    return (
      <div>
        <h2>
          welcome to <span className="font-bold">{session?.user?.name}</span>
        </h2>
        <div>
          Name : <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email : <span className="font-bold">{session?.user?.email}</span>
        </div>
      </div>
    );
};

export default Dashboard;