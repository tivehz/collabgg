"use client"

import { useState, useEffect } from "react"
import { useFakeWallet } from "@/lib/useFakeWallet"
import { getAllBadges } from "@/lib/fakeDb"
import Navbar from "@/components/ui/Navbar"

export default function Achievements() {
  const { isConnected, connectWallet, getUserBadges } = useFakeWallet()
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all")

  // Verificar se o usuário está conectado ao carregar a página
  useEffect(() => {
    // Verificamos se não está conectado e se estamos no cliente
    if (!isConnected && typeof window !== "undefined") {
      // Verificar no localStorage
      const walletData = localStorage.getItem("collab_wallet")
      if (!walletData) {
        // Não chamamos connectWallet() diretamente no useEffect
        // Em vez disso, definimos um estado para indicar que precisamos conectar
        // e deixamos o usuário decidir quando conectar
      }
    }
  }, [isConnected]) // Removemos connectWallet das dependências

  if (!isConnected) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Conecte sua Carteira</h2>
            <p className="text-gray-400 mb-6">
              Para visualizar as conquistas, você precisa conectar sua carteira primeiro.
            </p>
            <button onClick={connectWallet} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium">
              Conectar Carteira
            </button>
          </div>
        </div>
      </main>
    )
  }

  const userBadges = getUserBadges()
  const allBadges = getAllBadges()
  const unlockedBadgeIds = userBadges.map((item) => item.badge.id)
  const lockedBadges = allBadges.filter((badge) => !unlockedBadgeIds.includes(badge.id))

  let displayedBadges

  switch (filter) {
    case "unlocked":
      displayedBadges = userBadges.map(({ badge }) => ({
        ...badge,
        isUnlocked: true,
      }))
      break
    case "locked":
      displayedBadges = lockedBadges.map((badge) => ({
        ...badge,
        isUnlocked: false,
      }))
      break
    default:
      displayedBadges = [
        ...userBadges.map(({ badge }) => ({
          ...badge,
          isUnlocked: true,
        })),
        ...lockedBadges.map((badge) => ({
          ...badge,
          isUnlocked: false,
        })),
      ]
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Conquistas</h1>
            <p className="text-gray-400">Complete desafios para desbloquear badges e mostrar suas conquistas</p>
          </div>

          <div className="mt-4 md:mt-0 bg-gray-800 p-2 rounded-lg flex">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === "all" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Todas ({allBadges.length})
            </button>
            <button
              onClick={() => setFilter("unlocked")}
              className={`px-3 py-1 rounded-md text-sm mx-2 ${
                filter === "unlocked" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Desbloqueadas ({userBadges.length})
            </button>
            <button
              onClick={() => setFilter("locked")}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === "locked" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Bloqueadas ({lockedBadges.length})
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-gray-400 text-sm mb-1">Total de Badges</h3>
              <p className="text-3xl font-bold">{allBadges.length}</p>
            </div>
            <div className="text-center">
              <h3 className="text-gray-400 text-sm mb-1">Desbloqueadas</h3>
              <p className="text-3xl font-bold">{userBadges.length}</p>
            </div>
            <div className="text-center">
              <h3 className="text-gray-400 text-sm mb-1">Progresso</h3>
              <p className="text-3xl font-bold">
                {userBadges.length > 0 ? ((userBadges.length / allBadges.length) * 100).toFixed(0) : 0}%
              </p>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-6">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{ width: `${(userBadges.length / allBadges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedBadges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-gray-800 rounded-lg p-4 shadow-lg ${!badge.isUnlocked ? "opacity-60" : ""}`}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {badge.isUnlocked ? (
                    <img
                      src={badge.image || "/placeholder.svg"}
                      alt={badge.title}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                      }}
                    />
                  ) : (
                    <svg
                      className="w-10 h-10 text-gray-600"
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
                  )}
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-1">{badge.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{badge.description}</p>
                <p className="text-xs text-gray-500 mb-4">
                  {badge.isUnlocked ? "Desbloqueada" : `Critério: ${badge.criteria}`}
                </p>
                <div
                  className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                    badge.isUnlocked ? "bg-green-900 text-green-200" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {badge.isUnlocked ? "COMPLETADA" : "BLOQUEADA"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

