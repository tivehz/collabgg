"use client"

import { useState } from "react"

interface Market {
  id: string
  name: string
  baseAsset: string
  quoteAsset: string
  price: number
  change: string
}

interface MarketSelectorProps {
  markets: Market[]
  selectedMarket: Market
  onSelectMarket: (market: Market) => void
}

export default function MarketSelector({ markets, selectedMarket, onSelectMarket }: MarketSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrar mercados com base na busca
  const filteredMarkets = markets.filter(
    (market) =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.baseAsset.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar mercado..."
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
        {filteredMarkets.map((market) => (
          <button
            key={market.id}
            className={`w-full px-3 py-2 rounded-md text-left text-sm transition ${
              selectedMarket.id === market.id ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => onSelectMarket(market)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{market.name}</span>
              <span className={market.change.startsWith("+") ? "text-green-400" : "text-red-400"}>{market.change}</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-xs">
              <span className="text-gray-400">{market.baseAsset}</span>
              <span>
                {market.price} {market.quoteAsset}
              </span>
            </div>
          </button>
        ))}

        {filteredMarkets.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">Nenhum mercado encontrado</div>
        )}
      </div>
    </div>
  )
}

