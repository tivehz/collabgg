"use client"

import { useState } from "react"
import { useFakeWallet } from "@/lib/useFakeWallet"
import Navbar from "@/components/ui/Navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

// Atualizar o crate premium para usar a imagem da pessoa
const crateTypes = [
  {
    id: "standard",
    name: "Crate Padrão",
    price: 1.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u9629791682_httpss.mj.run9CB9nAmHDAA_a_blank_black_card_templ_7378021e-13c9-47af-8644-718c6053891d_1-vlY7ShHKP9TJ6yB3jzXyHbp7wcUZVh.png",
    description: "Contém 3 skins aleatórias com chance de raridades Common a Rare.",
    color: "from-green-500 to-blue-500",
    odds: [
      { rarity: "Common", chance: "70%" },
      { rarity: "Rare", chance: "25%" },
      { rarity: "Epic", chance: "5%" },
      { rarity: "Legendary", chance: "0%" },
    ],
  },
  {
    id: "premium",
    name: "Crate Premium",
    price: 2.5,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u9629791682_hdr_--ar_11_--v_6.1_efa419a1-8277-49c9-9d8c-28d80cbfd9cf_0-JHxKKS6zIKLznZXrbvOfcZkV3H8p8X.png",
    description: "Contém 3 skins aleatórias com chance de raridades Common a Epic.",
    color: "from-purple-500 to-pink-500",
    odds: [
      { rarity: "Common", chance: "40%" },
      { rarity: "Rare", chance: "40%" },
      { rarity: "Epic", chance: "18%" },
      { rarity: "Legendary", chance: "2%" },
    ],
  },
  {
    id: "legendary",
    name: "Crate Lendária",
    price: 5.0,
    image: "/placeholder.svg?height=200&width=200",
    description: "Contém 3 skins aleatórias com chance garantida de pelo menos uma Epic ou Legendary.",
    color: "from-yellow-500 to-red-500",
    odds: [
      { rarity: "Common", chance: "20%" },
      { rarity: "Rare", chance: "40%" },
      { rarity: "Epic", chance: "30%" },
      { rarity: "Legendary", chance: "10%" },
    ],
  },
  {
    id: "limited",
    name: "Crate Edição Limitada",
    price: 7.5,
    image: "/placeholder.svg?height=200&width=200",
    description: "Edição especial com skins exclusivas. Disponível por tempo limitado!",
    color: "from-green-500 to-blue-500",
    odds: [
      { rarity: "Common", chance: "0%" },
      { rarity: "Rare", chance: "30%" },
      { rarity: "Epic", chance: "50%" },
      { rarity: "Legendary", chance: "20%" },
    ],
  },
]

// Histórico de aberturas simulado
const openingHistory = [
  {
    id: "open-1",
    crateType: "premium",
    crateName: "Crate Premium",
    date: "2023-12-15",
    items: [
      { id: "skin-001", name: "Fallen 2024 Lendário", rarity: "Legendary" },
      { id: "skin-003", name: "Team Ruby Tigers", rarity: "Rare" },
      { id: "skin-007", name: "Starter Pack", rarity: "Common" },
    ],
  },
  {
    id: "open-2",
    crateType: "standard",
    crateName: "Crate Padrão",
    date: "2023-12-10",
    items: [
      { id: "skin-006", name: "Imperial Classic", rarity: "Rare" },
      { id: "skin-007", name: "Starter Pack", rarity: "Common" },
      { id: "skin-008", name: "CS Veteran", rarity: "Common" },
    ],
  },
]

export default function Crates() {
  const { isConnected, connectWallet, wallet } = useFakeWallet()
  const [selectedCrate, setSelectedCrate] = useState(crateTypes[0])
  const [isOpening, setIsOpening] = useState(false)
  const [openResults, setOpenResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("crates")

  // Função para abrir um crate
  const handleOpenCrate = () => {
    if (!isConnected || !wallet) return

    // Verificar se o usuário tem saldo suficiente
    if (wallet.balance < selectedCrate.price) {
      alert("Saldo insuficiente para abrir este crate!")
      return
    }

    setIsOpening(true)

    // Simular a abertura do crate após um delay
    setTimeout(() => {
      // Gerar itens aleatórios com base nas probabilidades do crate
      const items = generateRandomItems(selectedCrate)

      setOpenResults({
        crateType: selectedCrate.id,
        crateName: selectedCrate.name,
        date: new Date().toISOString().split("T")[0],
        items,
      })

      setIsOpening(false)
    }, 3000)
  }

  // Função para gerar itens aleatórios com base nas probabilidades do crate
  const generateRandomItems = (crate) => {
    // Simulação simplificada - em um sistema real, isso seria feito no servidor
    // para evitar manipulação pelo cliente

    const allSkins = [
      { id: "skin-001", name: "Fallen 2024 Lendário", rarity: "Legendary" },
      { id: "skin-002", name: "AWP Dragon Lore", rarity: "Legendary" },
      { id: "skin-003", name: "Team Ruby Tigers", rarity: "Rare" },
      { id: "skin-004", name: "Phantom Stealth", rarity: "Epic" },
      { id: "skin-005", name: "FNX Signature", rarity: "Epic" },
      { id: "skin-006", name: "Imperial Classic", rarity: "Rare" },
      { id: "skin-007", name: "Starter Pack", rarity: "Common" },
      { id: "skin-008", name: "CS Veteran", rarity: "Common" },
    ]

    // Mapear as probabilidades para facilitar a seleção
    const rarityProbabilities = {
      Common: Number.parseFloat(crate.odds[0].chance) / 100,
      Rare: Number.parseFloat(crate.odds[1].chance) / 100,
      Epic: Number.parseFloat(crate.odds[2].chance) / 100,
      Legendary: Number.parseFloat(crate.odds[3].chance) / 100,
    }

    // Função para selecionar uma raridade com base nas probabilidades
    const selectRarity = () => {
      const rand = Math.random()
      let cumulativeProbability = 0

      for (const [rarity, probability] of Object.entries(rarityProbabilities)) {
        cumulativeProbability += probability
        if (rand <= cumulativeProbability) {
          return rarity
        }
      }

      return "Common" // Fallback
    }

    // Selecionar 3 itens aleatórios
    const selectedItems = []
    for (let i = 0; i < 3; i++) {
      const targetRarity = selectRarity()
      const availableSkins = allSkins.filter((skin) => skin.rarity === targetRarity && !selectedItems.includes(skin))

      if (availableSkins.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSkins.length)
        selectedItems.push(availableSkins[randomIndex])
      } else {
        // Fallback se não houver skins disponíveis da raridade selecionada
        const randomIndex = Math.floor(Math.random() * allSkins.length)
        selectedItems.push(allSkins[randomIndex])
      }
    }

    return selectedItems
  }

  // Função para fechar os resultados
  const handleCloseResults = () => {
    setOpenResults(null)
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Conecte sua Carteira</h2>
            <p className="text-gray-400 mb-6">Para abrir crates, você precisa conectar sua carteira primeiro.</p>
            <button onClick={connectWallet} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium">
              Conectar Carteira
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crates & Loot Boxes</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="crates">Crates Disponíveis</TabsTrigger>
            <TabsTrigger value="history">Histórico de Aberturas</TabsTrigger>
          </TabsList>

          <TabsContent value="crates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {crateTypes.map((crate) => (
                <div
                  key={crate.id}
                  className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    selectedCrate.id === crate.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedCrate(crate)}
                >
                  <div className={`h-48 bg-gradient-to-br ${crate.color} flex items-center justify-center`}>
                    <img
                      src={crate.image || "/placeholder.svg"}
                      alt={crate.name}
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold">{crate.name}</h3>
                      <span className="font-medium">{crate.price} SOL</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{crate.description}</p>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-gray-300">Probabilidades:</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {crate.odds.map((odd, index) => (
                          <div key={index} className="flex justify-between">
                            <span
                              className={
                                odd.rarity === "Common"
                                  ? "text-gray-400"
                                  : odd.rarity === "Rare"
                                    ? "text-blue-400"
                                    : odd.rarity === "Epic"
                                      ? "text-purple-400"
                                      : "text-yellow-400"
                              }
                            >
                              {odd.rarity}:
                            </span>
                            <span>{odd.chance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-2">{selectedCrate.name}</h2>
                  <p className="text-gray-400">{selectedCrate.description}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={handleOpenCrate}
                    disabled={isOpening}
                    className={`px-6 py-3 bg-gradient-to-r ${selectedCrate.color} text-white font-medium rounded-md shadow-lg hover:opacity-90 transition ${
                      isOpening ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isOpening ? "Abrindo..." : `Abrir por ${selectedCrate.price} SOL`}
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Histórico de Aberturas</h2>

              {openingHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-400">Você ainda não abriu nenhum crate.</div>
              ) : (
                <div className="space-y-4">
                  {openingHistory.map((opening) => (
                    <div key={opening.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">{opening.crateName}</h3>
                        <span className="text-sm text-gray-400">{opening.date}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                        {opening.items.map((item, index) => (
                          <div key={index} className="bg-gray-800 rounded-lg p-2 flex items-center">
                            <div className="w-10 h-10 bg-gray-700 rounded-md mr-2"></div>
                            <div>
                              <div className="text-sm font-medium truncate">{item.name}</div>
                              <div
                                className={
                                  item.rarity === "Common"
                                    ? "text-gray-400"
                                    : item.rarity === "Rare"
                                      ? "text-blue-400"
                                      : item.rarity === "Epic"
                                        ? "text-purple-400"
                                        : "text-yellow-400"
                                }
                              >
                                {item.rarity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de resultados da abertura */}
      {openResults && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Resultados da Abertura</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {openResults.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.5, duration: 0.5 }}
                  className={`bg-gradient-to-br ${
                    item.rarity === "Common"
                      ? "from-gray-600 to-gray-400"
                      : item.rarity === "Rare"
                        ? "from-blue-600 to-blue-400"
                        : item.rarity === "Epic"
                          ? "from-purple-600 to-purple-400"
                          : "from-yellow-600 to-yellow-400"
                  } rounded-lg p-4 flex flex-col items-center text-center`}
                >
                  <div className="w-24 h-24 bg-gray-700 rounded-md mb-3 flex items-center justify-center">
                    <img src="/placeholder.svg?height=80&width=80" alt={item.name} className="w-16 h-16" />
                  </div>
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <span
                    className={
                      item.rarity === "Common"
                        ? "text-gray-200"
                        : item.rarity === "Rare"
                          ? "text-blue-200"
                          : item.rarity === "Epic"
                            ? "text-purple-200"
                            : "text-yellow-200"
                    }
                  >
                    {item.rarity}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleCloseResults}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

