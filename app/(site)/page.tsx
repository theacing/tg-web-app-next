'use client'

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

//

declare global {
  interface Window {
    Telegram?: {
      WebApp?: any
    }
  }
}

//

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [telegramId, setTelegramId] = useState<string | null>(null);
  
  useEffect(() => {

    if (window.Telegram?.WebApp) {

      WebApp.ready();
      WebApp.expand();

      const initDataString = window.Telegram.WebApp.initData;
      if (initDataString) {
        const urlParams = new URLSearchParams(initDataString);
        try {
          const user = JSON.parse(urlParams.get('user') || '{}');
          if (user.id) {
            setTelegramId(user.id.toString());
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);  


  // if (!telegramId) {
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center p-4">
  //       <h1 className="text-4xl font-bold mb-8">Charton dev build</h1>
  //       <p className="text-xl">This app can only be used within Telegram as a Mini App.</p>
  //     </main>
  //   )
  // }

  // if (isLoading) {
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center">
  //       <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
  //         Loading...
  //       </div>
  //     </main>
  //   )
  // }

  return (
      <div>
            <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      <div>
        Main content
      </div>
      <div>
      Main content
    </div>
    <div>
    Main content
  </div>
  <div>
        Main content
      </div>
      </div>
  );
}
