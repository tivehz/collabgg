"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFakeWallet } from "@/lib/useFakeWallet"

export default function Navbar() {
  const pathname = usePathname()
  const { wallet, isConnected, connectWallet, disconnectWallet, userProfile } = useFakeWallet()

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link href="/" className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collab.PNG-UIwgOLq9Uadv8fRbSeKvP9C4aSES15.png"
              alt="Collab Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Collab
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/" text="Home" active={pathname === "/"} />
          <NavLink href="/marketplace" text="Marketplace" active={pathname === "/marketplace"} />
          <NavLink href="/exchange" text="Exchange" active={pathname === "/exchange"} />
          <NavLink href="/crates" text="Crates" active={pathname === "/crates"} />
          <NavLink href="/profile" text="Profile" active={pathname === "/profile"} />
          <NavLink href="/achievements" text="Achievements" active={pathname === "/achievements"} />
          {isConnected && <NavLink href="/admin/create" text="Create Skin" active={pathname === "/admin/create"} />}
        </div>

        <div className="flex items-center space-x-3">
          {isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="text-sm bg-gray-800 rounded-md px-2 py-1">
                <span className="text-gray-400 mr-1">XP:</span>
                <span className="font-medium text-white">{userProfile?.xp}</span>
                <span className="text-gray-400 mx-1">|</span>
                <span className="text-gray-400 mr-1">Lvl:</span>
                <span className="font-medium text-white">{userProfile?.level}</span>
              </div>
              <div className="text-sm bg-gray-800 rounded-md px-2 py-1">
                <span className="text-gray-400 mr-1">Balance:</span>
                <span className="font-medium text-white">{wallet?.balance.toFixed(2)}</span>
              </div>
              <div className="text-sm bg-gray-800 rounded-md px-2 py-1 truncate max-w-[120px]">
                {wallet?.publicKey.slice(0, 6)}...{wallet?.publicKey.slice(-4)}
              </div>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition duration-200"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, text, active }: { href: string; text: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-2 py-1 rounded-md transition duration-200 ${
        active ? "text-white font-medium" : "text-gray-300 hover:text-white hover:bg-gray-800"
      }`}
    >
      {text}
    </Link>
  )
}

