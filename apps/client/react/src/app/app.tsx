import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../modules/common/components/navbar/navbar';

export function App() {
  const [header, setHeader] = useState<ReactNode>(null);

  return (
    <div>
      <Navbar />

      {header}

      <main className="max-w-6xl px-4 mx-auto ">
        <Outlet context={{ setHeader }}></Outlet>
      </main>
    </div>
  );
}

export default App;
