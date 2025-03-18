"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Simulated user data
  const userData = {
    walletAddress: "0x7Fe8Ed5d732b341f4734C96120Cf8C69e49527e7",
    nickname: "Player_7Fe8Ed",
    level: 3,
    xp: 125,
    totalSkins: 5,
    unlockedBadges: 4,
    balance: 8.7,
  }

  // Simulated activity data for charts
  const activityData = [
    { day: "Mon", xp: 10, transactions: 1 },
    { day: "Tue", xp: 15, transactions: 2 },
    { day: "Wed", xp: 0, transactions: 0 },
    { day: "Thu", xp: 25, transactions: 2 },
    { day: "Fri", xp: 30, transactions: 3 },
    { day: "Sat", xp: 35, transactions: 2 },
    { day: "Sun", xp: 10, transactions: 1 },
  ]

  // Collection distribution data
  const collectionData = [
    { name: "Common", value: 2, color: "#9CA3AF" },
    { name: "Rare", value: 1, color: "#3B82F6" },
    { name: "Epic", value: 1, color: "#8B5CF6" },
    { name: "Legendary", value: 1, color: "#F59E0B" },
  ]

  // Mock skin data
  const ownedSkins = [
    {
      id: "skin-001",
      name: "Fallen 2024 Lendário",
      image: "/placeholder.svg?height=80&width=80",
      rarity: "Legendary",
      price: 5.0,
    },
    {
      id: "skin-003",
      name: "Team Ruby Tigers",
      image: "/placeholder.svg?height=80&width=80",
      rarity: "Rare",
      price: 1.2,
    },
    {
      id: "skin-004",
      name: "Phantom Stealth",
      image: "/placeholder.svg?height=80&width=80",
      rarity: "Epic",
      price: 3.5,
    },
  ]

  // Mock badges data
  const badges = [
    {
      id: "badge-001",
      title: "Colecionador Iniciante",
      image: "/placeholder.svg?height=60&width=60",
      unlockedAt: Date.now() - 1000000,
    },
    {
      id: "badge-002",
      title: "Caçador de Raridades",
      image: "/placeholder.svg?height=60&width=60",
      unlockedAt: Date.now() - 500000,
    },
    {
      id: "badge-004",
      title: "Nível 3 Alcançado",
      image: "/placeholder.svg?height=60&width=60",
      unlockedAt: Date.now() - 200000,
    },
    {
      id: "badge-007",
      title: "Membro Fundador",
      image: "/placeholder.svg?height=60&width=60",
      unlockedAt: Date.now() - 1500000,
    },
  ]

  // Mock marketplace skins
  const marketplaceSkins = [
    {
      id: "skin-002",
      name: "AWP Dragon Lore",
      image: "/placeholder.svg?height=80&width=80",
      rarity: "Legendary",
      price: 7.5,
    },
    {
      id: "skin-005",
      name: "FNX Signature",
      image: "/placeholder.svg?height=80&width=80",
      rarity: "Epic",
      price: 3.0,
    },
    {
      id: "skin-006",
      name: "Imperial Classic",
      image: "/placeholder.svg?height=80&width=80",
      rarity: "Rare",
      price: 1.5,
    },
  ]

  // Get rarity color
  const getRarityColor = (rarity) => {
    const colors = {
      Common: "bg-gray-500",
      Rare: "bg-blue-500",
      Epic: "bg-purple-500",
      Legendary: "bg-yellow-500",
    }
    return colors[rarity] || "bg-gray-500"
  }

  // Get rarity text color
  const getRarityTextColor = (rarity) => {
    const colors = {
      Common: "text-gray-500",
      Rare: "text-blue-500",
      Epic: "text-purple-500",
      Legendary: "text-yellow-500",
    }
    return colors[rarity] || "text-gray-500"
  }

  // XP progress calculation
  const xpForCurrentLevel = (userData.level - 1) * 50
  const xpForNextLevel = userData.level * 50
  const currentLevelProgress = ((userData.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-gray-400 font-medium mb-1">Level</h3>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{userData.level}</div>
            <div className="text-gray-400 text-sm">Next: {xpForNextLevel} XP</div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${currentLevelProgress}%` }}></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {userData.xp - xpForCurrentLevel}/{xpForNextLevel - xpForCurrentLevel} XP
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-gray-400 font-medium mb-1">Collection</h3>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{userData.totalSkins}</div>
            <div className="flex space-x-1">
              <span className="text-gray-500 text-xs px-2 py-1 bg-gray-700 rounded-md">Common: 2</span>
              <span className="text-blue-500 text-xs px-2 py-1 bg-gray-700 rounded-md">Rare: 1</span>
              <span className="text-purple-500 text-xs px-2 py-1 bg-gray-700 rounded-md">Epic: 1</span>
              <span className="text-yellow-500 text-xs px-2 py-1 bg-gray-700 rounded-md">Legendary: 1</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-gray-400 font-medium mb-1">Badges</h3>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{userData.unlockedBadges}</div>
            <div className="text-gray-400 text-sm">Unlocked {userData.unlockedBadges}/7</div>
          </div>
          <div className="flex mt-2 space-x-1">
            {badges.slice(0, 3).map((badge) => (
              <div key={badge.id} className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden">
                <img src={badge.image || "/placeholder.svg"} alt={badge.title} className="w-full h-full object-cover" />
              </div>
            ))}
            {userData.unlockedBadges > 3 && (
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                +{userData.unlockedBadges - 3}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-gray-400 font-medium mb-1">Balance</h3>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{userData.balance.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">SOL</div>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            <span className="inline-block px-2 py-1 bg-gray-700 rounded-md">
              <span className="text-green-500">↑</span> Deposit
            </span>
            <span className="inline-block px-2 py-1 bg-gray-700 rounded-md ml-2">
              <span className="text-red-500">↓</span> Send
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-2 p-4 border-b border-gray-800">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "overview" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "collection" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveTab("collection")}
        >
          My Collection
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "marketplace" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveTab("marketplace")}
        >
          Marketplace
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === "achievements" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          onClick={() => setActiveTab("achievements")}
        >
          Badges
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }}
                      itemStyle={{ color: "#F9FAFB" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="xp" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="transactions" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Collection Distribution</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={collectionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {collectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }}
                      formatter={(value, name) => [`${value} Skins`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 shadow-lg lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Latest Acquisitions</h3>
                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ownedSkins.slice(0, 3).map((skin) => (
                  <div key={skin.id} className="bg-gray-700 rounded-lg overflow-hidden">
                    <div className="p-2 flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gray-600 rounded-md overflow-hidden">
                        <img
                          src={skin.image || "/placeholder.svg"}
                          alt={skin.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{skin.name}</h4>
                        <p className={`text-sm ${getRarityTextColor(skin.rarity)}`}>{skin.rarity}</p>
                        <p className="text-sm text-gray-400">{skin.price.toFixed(2)} SOL</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Collection Tab */}
        {activeTab === "collection" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">My Skins</h3>
              <div className="flex space-x-2">
                <select className="bg-gray-800 text-gray-200 text-sm rounded-md px-3 py-1 border border-gray-700">
                  <option>All Rarities</option>
                  <option>Common</option>
                  <option>Rare</option>
                  <option>Epic</option>
                  <option>Legendary</option>
                </select>
                <select className="bg-gray-800 text-gray-200 text-sm rounded-md px-3 py-1 border border-gray-700">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Oldest</option>
                  <option>Sort by: Rarity</option>
                  <option>Sort by: Price</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...ownedSkins, ...ownedSkins].map((skin, index) => (
                <div key={`${skin.id}-${index}`} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="h-48 bg-gray-700 relative">
                    <img
                      src={skin.image || "/placeholder.svg"}
                      alt={skin.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${getRarityColor(skin.rarity)} bg-opacity-90`}
                    >
                      {skin.rarity}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{skin.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Value:</span>
                      <span className="font-medium">{skin.price.toFixed(2)} SOL</span>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm">
                        View Details
                      </button>
                      <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm">
                        Trade
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === "marketplace" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Available Skins</h3>
              <div className="flex space-x-2">
                <select className="bg-gray-800 text-gray-200 text-sm rounded-md px-3 py-1 border border-gray-700">
                  <option>All Rarities</option>
                  <option>Common</option>
                  <option>Rare</option>
                  <option>Epic</option>
                  <option>Legendary</option>
                </select>
                <select className="bg-gray-800 text-gray-200 text-sm rounded-md px-3 py-1 border border-gray-700">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...marketplaceSkins, ...marketplaceSkins].map((skin, index) => (
                <div key={`${skin.id}-${index}`} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="h-48 bg-gray-700 relative">
                    <img
                      src={skin.image || "/placeholder.svg"}
                      alt={skin.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${getRarityColor(skin.rarity)} bg-opacity-90`}
                    >
                      {skin.rarity}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{skin.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400">Price:</span>
                      <span className="font-medium text-lg">{skin.price.toFixed(2)} SOL</span>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div>
            <h3 className="text-xl font-bold mb-4">My Badges</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={badge.image || "/placeholder.svg"}
                        alt={badge.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{badge.title}</h4>
                      <p className="text-sm text-gray-400">
                        Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Locked badges */}
              {[
                { id: "badge-003", title: "Trader Experiente", criteria: "Complete 5 transactions" },
                { id: "badge-005", title: "Coleção Inicial", criteria: "Own 3 different skins" },
                { id: "badge-006", title: "Fã de Epic", criteria: "Own 2 Epic skins" },
              ].map((badge) => (
                <div key={badge.id} className="bg-gray-800 rounded-lg p-4 shadow-lg opacity-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">{badge.title}</h4>
                      <p className="text-sm text-gray-400">{badge.criteria}</p>
                      <p className="text-xs text-gray-500 mt-1">Locked</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Badge Progress</h3>

              <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Trader Experiente (2/5)</span>
                    <span className="text-sm text-gray-400">40%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Coleção Inicial (2/3)</span>
                    <span className="text-sm text-gray-400">67%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Fã de Epic (1/2)</span>
                    <span className="text-sm text-gray-400">50%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

