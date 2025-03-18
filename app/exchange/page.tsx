"use client"

import { useState, useEffect } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import Navbar from "@/components/ui/Navbar"
import { useFakeWallet } from "@/lib/useFakeWallet"
import OrderBook from "@/components/exchange/OrderBook"
import TradeHistory from "@/components/exchange/TradeHistory"
import TradingForm from "@/components/exchange/TradingForm"
import MarketSelector from "@/components/exchange/MarketSelector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados para o gráfico de preços
const priceData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (30 - i))

  // Gerar um preço que flutua entre 0.5 e 5.0 com tendência de alta
  const basePrice = 0.5 + i / 10
  const randomFactor = Math.random() * 0.4 - 0.2 // -0.2 a 0.2
  const price = basePrice + randomFactor

  // Gerar volume que varia entre 100 e 1000
  const volume = Math.floor(Math.random() * 900) + 100

  return {
    date: date.toLocaleDateString(),
    price: Number.parseFloat(price.toFixed(2)),
    volume: volume,
  }
})

// Dados simulados para o order book
const generateOrders = (basePrice, count, isBuy) => {
  return Array.from({ length: count }, (_, i) => {
    const priceDiff = (Math.random() * 0.05 + 0.01) * (i + 1)
    const price = isBuy
      ? Number.parseFloat((basePrice - priceDiff).toFixed(2))
      : Number.parseFloat((basePrice + priceDiff).toFixed(2))
    const amount = Number.parseFloat((Math.random() * 10 + 1).toFixed(2))
    const total = Number.parseFloat((price * amount).toFixed(2))

    return { price, amount, total }
  }).sort((a, b) => (isBuy ? b.price - a.price : a.price - b.price))
}

// Dados simulados para o histórico de trades
const generateTradeHistory = (basePrice, count) => {
  return Array.from({ length: count }, (_, i) => {
    const priceDiff = Math.random() * 0.1 - 0.05
    const price = Number.parseFloat((basePrice + priceDiff).toFixed(2))
    const amount = Number.parseFloat((Math.random() * 5 + 0.1).toFixed(2))
    const total = Number.parseFloat((price * amount).toFixed(2))
    const timestamp = new Date(Date.now() - i * 60000).toLocaleTimeString()
    const type = Math.random() > 0.5 ? "buy" : "sell"

    return { price, amount, total, timestamp, type }
  })
}

// Mercados disponíveis
const markets = [
  { id: "fallen-legendary", name: "FALLEN/SOL", baseAsset: "FALLEN", quoteAsset: "SOL", price: 5.0, change: "+2.5%" },
  { id: "dragon-lore", name: "DRAGON/SOL", baseAsset: "DRAGON", quoteAsset: "SOL", price: 7.5, change: "+5.2%" },
  { id: "ruby-tigers", name: "RUBY/SOL", baseAsset: "RUBY", quoteAsset: "SOL", price: 1.2, change: "-1.8%" },
  { id: "phantom-stealth", name: "PHANTOM/SOL", baseAsset: "PHANTOM", quoteAsset: "SOL", price: 3.5, change: "+0.7%" },
  { id: "fnx-signature", name: "FNX/SOL", baseAsset: "FNX", quoteAsset: "SOL", price: 3.0, change: "+1.2%" },
]

export default function Exchange() {
  const { isConnected, connectWallet } = useFakeWallet()
  const [selectedMarket, setSelectedMarket] = useState(markets[0])
  const [timeframe, setTimeframe] = useState("1d")
  const [orderType, setOrderType] = useState("limit")
  const [buyOrders, setBuyOrders] = useState([])
  const [sellOrders, setSellOrders] = useState([])
  const [tradeHistory, setTradeHistory] = useState([])

  // Inicializar dados simulados
  useEffect(() => {
    const currentPrice = selectedMarket.price
    setBuyOrders(generateOrders(currentPrice, 10, true))
    setSellOrders(generateOrders(currentPrice, 10, false))
    setTradeHistory(generateTradeHistory(currentPrice, 20))
  }, [selectedMarket])

  // Função para trocar o mercado selecionado
  const handleMarketChange = (market) => {
    setSelectedMarket(market)
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Conecte sua Carteira</h2>
            <p className="text-gray-400 mb-6">Para acessar a exchange, você precisa conectar sua carteira primeiro.</p>
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

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar com seletor de mercados */}
          <div className="w-full lg:w-64 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Mercados</h2>
            <MarketSelector markets={markets} selectedMarket={selectedMarket} onSelectMarket={handleMarketChange} />
          </div>

          {/* Área principal */}
          <div className="flex-1">
            {/* Cabeçalho do mercado */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{selectedMarket.name}</h1>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold mr-2">
                      {selectedMarket.price} {selectedMarket.quoteAsset}
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        selectedMarket.change.startsWith("+")
                          ? "bg-green-900 text-green-400"
                          : "bg-red-900 text-red-400"
                      }`}
                    >
                      {selectedMarket.change}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
                    Adicionar aos Favoritos
                  </button>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">Ver Detalhes</button>
                </div>
              </div>
            </div>

            {/* Gráfico de preços */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${timeframe === "1h" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                    onClick={() => setTimeframe("1h")}
                  >
                    1H
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${timeframe === "1d" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                    onClick={() => setTimeframe("1d")}
                  >
                    1D
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${timeframe === "1w" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                    onClick={() => setTimeframe("1w")}
                  >
                    1W
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${timeframe === "1m" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                    onClick={() => setTimeframe("1m")}
                  >
                    1M
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">Linha</button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">Candles</button>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }}
                      itemStyle={{ color: "#F9FAFB" }}
                      formatter={(value) => [`${value} ${selectedMarket.quoteAsset}`, "Preço"]}
                    />
                    <Area type="monotone" dataKey="price" stroke="#3B82F6" fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Área de trading e order book */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Formulário de trading */}
              <div className="bg-gray-800 rounded-lg p-4">
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-green-600">
                      Comprar
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-red-600">
                      Vender
                    </TabsTrigger>
                  </TabsList>
                  <div className="mb-4">
                    <div className="flex space-x-2 mb-4">
                      <button
                        className={`flex-1 px-3 py-2 rounded-md text-sm ${orderType === "limit" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                        onClick={() => setOrderType("limit")}
                      >
                        Limite
                      </button>
                      <button
                        className={`flex-1 px-3 py-2 rounded-md text-sm ${orderType === "market" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                        onClick={() => setOrderType("market")}
                      >
                        Mercado
                      </button>
                    </div>
                  </div>

                  <TabsContent value="buy">
                    <TradingForm
                      type="buy"
                      orderType={orderType}
                      baseAsset={selectedMarket.baseAsset}
                      quoteAsset={selectedMarket.quoteAsset}
                      currentPrice={selectedMarket.price}
                    />
                  </TabsContent>

                  <TabsContent value="sell">
                    <TradingForm
                      type="sell"
                      orderType={orderType}
                      baseAsset={selectedMarket.baseAsset}
                      quoteAsset={selectedMarket.quoteAsset}
                      currentPrice={selectedMarket.price}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Order Book */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-4">Order Book</h3>
                <OrderBook buyOrders={buyOrders} sellOrders={sellOrders} quoteAsset={selectedMarket.quoteAsset} />
              </div>

              {/* Histórico de Trades */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-4">Histórico de Trades</h3>
                <TradeHistory trades={tradeHistory} quoteAsset={selectedMarket.quoteAsset} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

