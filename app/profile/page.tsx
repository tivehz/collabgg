"use client"

import { useState, useEffect } from "react"
import { type Skin, rarityColors, rarityTextColors } from "@/lib/types"
import { useFakeWallet } from "@/lib/useFakeWallet"
import { getUserSkins, getAllBadges } from "@/lib/fakeDb"
import Navbar from "@/components/ui/Navbar"

export default function Profile() {
  const { isConnected, connectWallet, userProfile, getUserBadges, wallet } = useFakeWallet()
  const [userSkins, setUserSkins] = useState<Skin[]>([])
  const [activeSections, setActiveSections] = useState({
    collection: true,
    badges: false,
    stats: false,
  })

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

  // Buscar skins e badges do usuário quando estiver conectado
  useEffect(() => {
    if (isConnected && userProfile) {
      const skins = getUserSkins(userProfile.walletAddress)
      setUserSkins(skins)
    }
  }, [isConnected, userProfile])

  // Alternar entre as seções
  const toggleSection = (section: keyof typeof activeSections) => {
    setActiveSections((prev) => {
      const newState = { collection: false, badges: false, stats: false }
      newState[section] = true
      return newState
    })
  }

  if (!isConnected || !userProfile) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Conecte sua Carteira</h2>
            <p className="text-gray-400 mb-6">
              Para visualizar seu perfil, você precisa conectar sua carteira primeiro.
            </p>
            <button onClick={connectWallet} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium">
              Conectar Carteira
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Calcular XP necessário para o próximo nível
  const xpForCurrentLevel = (userProfile.level - 1) * 50
  const xpForNextLevel = userProfile.level * 50
  const currentLevelProgress = ((userProfile.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100

  // Obter badges do usuário
  const userBadges = getUserBadges()

  // Obter todas as badges para mostrar as que ainda não foram desbloqueadas
  const allBadges = getAllBadges()
  const unlockedBadgeIds = userBadges.map((item) => item.badge.id)
  const lockedBadges = allBadges.filter((badge) => !unlockedBadgeIds.includes(badge.id))

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold">
              {userProfile.nickname.charAt(0)}
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-1">{userProfile.nickname}</h1>
              <p className="text-gray-400 text-sm mb-2">{wallet?.publicKey}</p>
              <div className="flex items-center mb-2">
                <span className="text-gray-400 mr-2">Nível {userProfile.level}</span>
                <div className="flex-grow h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${currentLevelProgress}%` }}
                  ></div>
                </div>
                <span className="text-gray-400 ml-2">
                  {userProfile.xp}/{xpForNextLevel} XP
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-gray-700 rounded-md text-sm">
                  <span className="text-gray-400 mr-1">Skins:</span>
                  <span className="font-medium">{userSkins.length}</span>
                </div>
                <div className="px-3 py-1 bg-gray-700 rounded-md text-sm">
                  <span className="text-gray-400 mr-1">Badges:</span>
                  <span className="font-medium">
                    {userBadges.length}/{allBadges.length}
                  </span>
                </div>
                <div className="px-3 py-1 bg-gray-700 rounded-md text-sm">
                  <span className="text-gray-400 mr-1">Membro desde:</span>
                  <span className="font-medium">{new Date(userProfile.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="px-3 py-1 bg-gray-700 rounded-md text-sm">
                <span className="text-gray-400 mr-1">Saldo:</span>
                <span className="font-medium">{wallet?.balance.toFixed(2)} SOL</span>
              </div>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">Editar Perfil</button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeSections.collection ? "border-b-2 border-blue-500 text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => toggleSection("collection")}
          >
            Minha Coleção
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeSections.badges ? "border-b-2 border-blue-500 text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => toggleSection("badges")}
          >
            Badges e Conquistas
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeSections.stats ? "border-b-2 border-blue-500 text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => toggleSection("stats")}
          >
            Estatísticas
          </button>
        </div>

        {/* Collection Section */}
        {activeSections.collection && (
          <div>
            {userSkins.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Sua coleção está vazia</h3>
                <p className="text-gray-400 mb-6">
                  Visite o marketplace para começar a adquirir skins para sua coleção.
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium">
                  Explorar Marketplace
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userSkins.map((skin) => (
                  <div
                    key={skin.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 relative">
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center">
                        <img
                          src={skin.image || "/placeholder.svg"}
                          alt={skin.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback para placeholder se a imagem não for encontrada
                            e.currentTarget.src = "/placeholder.svg?height=320&width=400"
                          }}
                        />
                      </div>
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${rarityColors[skin.rarity]} bg-opacity-90`}
                      >
                        {skin.rarity}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1 truncate">{skin.name}</h3>
                      <p className="text-gray-400 text-sm h-10 overflow-hidden">{skin.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <span className="text-gray-400 text-sm mr-1">Valor:</span>
                          <span className="text-white font-medium">{skin.price.toFixed(2)} SOL</span>
                        </div>
                        <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-700 hover:bg-gray-600">
                          Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Badges Section */}
        {activeSections.badges && (
          <div>
            <h2 className="text-xl font-bold mb-4">Badges Desbloqueadas</h2>

            {userBadges.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center mb-8">
                <h3 className="text-lg font-medium mb-4">Nenhuma badge desbloqueada ainda</h3>
                <p className="text-gray-400">
                  Continue usando a plataforma e completando ações para desbloquear badges.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {userBadges.map(({ badge, unlockedAt }) => (
                  <div key={badge.id} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <img
                        src={badge.image || "/placeholder.svg"}
                        alt={badge.title}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{badge.title}</h3>
                      <p className="text-gray-400 text-sm">{badge.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Desbloqueada em {new Date(unlockedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-xl font-bold mb-4">Badges Bloqueadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {lockedBadges.map((badge) => (
                <div key={badge.id} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 opacity-60">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold">{badge.title}</h3>
                    <p className="text-gray-400 text-sm">{badge.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Critério: {badge.criteria}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        {activeSections.stats && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Progresso de XP</h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Nível {userProfile.level}</span>
                    <span>Nível {userProfile.level + 1}</span>
                  </div>
                  <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${currentLevelProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-400">
                    <span>{userProfile.xp - xpForCurrentLevel} XP</span>
                    <span>{xpForNextLevel - xpForCurrentLevel} XP</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">XP Total:</span>
                    <span>{userProfile.xp} XP</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Próximo nível:</span>
                    <span>+{xpForNextLevel - userProfile.xp} XP</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Estatísticas da Coleção</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-400">Total de Skins:</span>
                      <span>{userSkins.length}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${(userSkins.length / 8) * 100}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-400">Badges desbloqueadas:</span>
                      <span>
                        {userBadges.length}/{allBadges.length}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${(userBadges.length / allBadges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Distribuição por Raridade</h4>
                    <div className="space-y-2">
                      {["Common", "Rare", "Epic", "Legendary"].map((rarity) => {
                        const count = userSkins.filter((skin) => skin.rarity === rarity).length
                        const percentage = userSkins.length ? (count / userSkins.length) * 100 : 0
                        return (
                          <div key={rarity}>
                            <div className="flex justify-between items-center text-sm mb-1">
                              <span className={rarityTextColors[rarity as keyof typeof rarityTextColors]}>
                                {rarity}:
                              </span>
                              <span>
                                {count} ({percentage.toFixed(0)}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${rarityColors[rarity as keyof typeof rarityColors]}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

