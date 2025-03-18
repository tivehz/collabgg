"use client"

import { useState, useEffect } from "react"
import { type Skin, type Rarity, rarityColors } from "@/lib/types"
import { getAvailableSkins } from "@/lib/fakeDb"
import { useFakeWallet } from "@/lib/useFakeWallet"
import Navbar from "@/components/ui/Navbar"

export default function Marketplace() {
  const { isConnected, purchaseSkin, refreshProfile } = useFakeWallet()
  const [skins, setSkins] = useState<Skin[]>([])
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([])
  const [rarityFilter, setRarityFilter] = useState<string>("all")
  const [priceSort, setPriceSort] = useState<string>("low-to-high")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [purchaseStatus, setPurchaseStatus] = useState<{
    isProcessing: boolean
    message: string
    status: "idle" | "success" | "error"
  }>({
    isProcessing: false,
    message: "",
    status: "idle",
  })

  // Buscar skins disponíveis
  useEffect(() => {
    const fetchSkins = () => {
      try {
        // Em um sistema real, isso seria uma chamada à API
        const availableSkins = getAvailableSkins()
        setSkins(availableSkins)
        setFilteredSkins(availableSkins)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao buscar skins:", error)
        setIsLoading(false)
      }
    }

    fetchSkins()
  }, [])

  // Aplicar filtros e ordenação
  useEffect(() => {
    let result = [...skins]

    // Aplicar filtro de raridade
    if (rarityFilter !== "all") {
      result = result.filter((skin) => skin.rarity === rarityFilter)
    }

    // Aplicar filtro de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (skin) => skin.name.toLowerCase().includes(query) || skin.description.toLowerCase().includes(query),
      )
    }

    // Aplicar ordenação de preço
    if (priceSort === "low-to-high") {
      result.sort((a, b) => a.price - b.price)
    } else if (priceSort === "high-to-low") {
      result.sort((a, b) => b.price - a.price)
    } else if (priceSort === "newest") {
      result.sort((a, b) => b.createdAt - a.createdAt)
    }

    setFilteredSkins(result)
  }, [skins, rarityFilter, priceSort, searchQuery])

  // Função para comprar skin
  const handleBuySkin = async (skinId: string) => {
    if (!isConnected) {
      alert("Por favor, conecte sua carteira primeiro")
      return
    }

    setPurchaseStatus({
      isProcessing: true,
      message: "Processando sua compra...",
      status: "idle",
    })

    try {
      const success = await purchaseSkin(skinId)

      if (success) {
        setPurchaseStatus({
          isProcessing: false,
          message: "Skin comprada com sucesso!",
          status: "success",
        })

        // Atualizar a lista de skins disponíveis
        const updatedSkins = getAvailableSkins()
        setSkins(updatedSkins)

        // Atualizar o perfil do usuário
        refreshProfile()

        // Resetar o status após 3 segundos
        setTimeout(() => {
          setPurchaseStatus({
            isProcessing: false,
            message: "",
            status: "idle",
          })
        }, 3000)
      } else {
        setPurchaseStatus({
          isProcessing: false,
          message: "Falha ao comprar a skin. Tente novamente.",
          status: "error",
        })
      }
    } catch (error) {
      setPurchaseStatus({
        isProcessing: false,
        message: "Erro ao processar a compra.",
        status: "error",
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
            <p className="text-gray-400">Explore e adquira skins exclusivas para sua coleção</p>
          </div>

          {purchaseStatus.message && (
            <div
              className={`px-4 py-2 rounded-md ${
                purchaseStatus.status === "success"
                  ? "bg-green-900 text-green-200"
                  : purchaseStatus.status === "error"
                    ? "bg-red-900 text-red-200"
                    : "bg-blue-900 text-blue-200"
              }`}
            >
              {purchaseStatus.message}
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar skins..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={rarityFilter}
                onChange={(e) => setRarityFilter(e.target.value)}
              >
                <option value="all">Todas Raridades</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
              <select
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
              >
                <option value="low-to-high">Preço: Menor para Maior</option>
                <option value="high-to-low">Preço: Maior para Menor</option>
                <option value="newest">Mais Recentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skins Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredSkins.length === 0 ? (
          <div className="text-center p-8 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Nenhuma skin encontrada</h3>
            <p className="text-gray-400">Tente ajustar seus filtros ou volte mais tarde para ver novas skins.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSkins.map((skin) => (
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
                    className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${rarityColors[skin.rarity as Rarity]} bg-opacity-90`}
                  >
                    {skin.rarity}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 truncate">{skin.name}</h3>
                  <p className="text-gray-400 text-sm h-10 overflow-hidden">{skin.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm mr-1">Preço:</span>
                      <span className="text-white font-medium">{skin.price.toFixed(2)} SOL</span>
                    </div>
                    <button
                      onClick={() => handleBuySkin(skin.id)}
                      disabled={purchaseStatus.isProcessing}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                        purchaseStatus.isProcessing ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {purchaseStatus.isProcessing ? "Processando..." : "Comprar"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

