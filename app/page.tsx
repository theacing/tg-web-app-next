'use client'

import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

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

  //

  const [isChannelMember, setIsChannelMember] = useState<boolean | null>(null)
  const [telegramId, setTelegramId] = useState<string | null>(null)
  const [channelUsername, setChannelUsername] = useState('')
  const [error, setError] = useState<string | null>(null)

  //

  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, []);
  
  useEffect(() => {

    if (window.Telegram?.WebApp) {

    //

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

    //

    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    }

  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  //

  const checkChannelMembership = async () => {
    if (!telegramId) {
      alert('This app can only be used within Telegram')
      return
    }

    if (!channelUsername) {
      alert('Please enter a channel username')
      return 
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/check-membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId,
          channelUsername,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to check membership')
      }

      const data = await response.json()
      setIsChannelMember(data.isMember)
      setError(null)
    } catch (error) {
      console.error('Error checking channel membership:', error)
      setIsChannelMember(false)
      setError(error instanceof Error ? error.message : 'An unknown error occured')
    } finally {
      setIsLoading(false)
    }
  }

  if (!telegramId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-8">Telegram Channel Membership Check</h1>
        <p className="text-xl">This app can only be used within Telegram as a Mini App.</p>
      </main>
    )
  }

  //

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  }

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>

      {/* // */}

      <input 
        type="text" 
        value={channelUsername}
        onChange={(e) => setChannelUsername(e.target.value)}
        placeholder="Enter channel username (e.g., @example)"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
      />
      <button
        onClick={checkChannelMembership}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isLoading || !channelUsername}
      >
        {isLoading ? 'Checking...' : 'Check Membership'}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {isChannelMember !== null && !isLoading && (
        <p className="mt-4 text-xl">
          {isChannelMember
            ? "You are a member of the channel!"
            : "You are not a member of the channel."}
        </p>
      )}

      {/* // */}

      {
        tonWalletAddress ? (
          <div className="flex flex-col items-center">
            <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
            <button
              onClick={handleWalletAction}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={handleWalletAction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect TON Wallet
          </button>
        )
      }

    </main>
  );
}
