"use client"

import { type Skin, rarityColors } from "@/lib/types"
import { useFakeWallet } from "@/lib/useFakeWallet"

interface SkinCardProps {
  skin: Skin
  showBuyButton?: boolean
}

export default function SkinCard({ skin, showBuyButton = true }: SkinCardProps) {
  const { isConnected, purchaseSkin, wallet } = useFakeWallet()

  const handleBuy = async () => {
    if (!isConnected) {
      alert("Por favor, conecte sua carteira primeiro")
      return
    }

    const success = await purchaseSkin(skin.id)

    if (success) {
      alert(`Compra bem-sucedida: ${skin.name}`)
      // Atualiza a página para mostrar as mudanças
      window.location.reload()
    } else {
      alert("Falha ao comprar a skin. Tente novamente.")
    }
  }

  const isAvailableForPurchase = skin.owner === "platform"

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]">
      <div className="relative h-48">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700">
          <img
            src={skin.image || "/placeholder.svg"}
            alt={skin.name}
            className="object-cover w-full h-full"
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
        <p className="text-gray-400 text-sm h-10 line-clamp-2">{skin.description}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-1">Preço:</span>
            <span className="text-white font-medium">{skin.price.toFixed(2)} SOL</span>
          </div>

          {showBuyButton && isAvailableForPurchase && (
            <button
              onClick={handleBuy}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Comprar
            </button>
          )}

          {!isAvailableForPurchase && (
            <span className="text-sm text-gray-400">{skin.owner === wallet?.publicKey ? "Sua Skin" : "Vendido"}</span>
          )}
        </div>
      </div>
    </div>
  )
}

