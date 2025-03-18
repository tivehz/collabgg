"use client"

interface Order {
  price: number
  amount: number
  total: number
}

interface OrderBookProps {
  buyOrders: Order[]
  sellOrders: Order[]
  quoteAsset: string
}

export default function OrderBook({ buyOrders, sellOrders, quoteAsset }: OrderBookProps) {
  // Encontrar o maior total para calcular a largura da barra de profundidade
  const maxTotal = Math.max(...buyOrders.map((order) => order.total), ...sellOrders.map((order) => order.total))

  return (
    <div className="text-sm">
      {/* Cabeçalho */}
      <div className="grid grid-cols-3 text-gray-400 mb-2">
        <div>Preço ({quoteAsset})</div>
        <div className="text-right">Quantidade</div>
        <div className="text-right">Total</div>
      </div>

      {/* Ordens de venda (em ordem decrescente) */}
      <div className="mb-4 space-y-1">
        {sellOrders.map((order, index) => (
          <div key={`sell-${index}`} className="grid grid-cols-3 relative">
            <div
              className="absolute right-0 h-full bg-red-900 opacity-20"
              style={{ width: `${(order.total / maxTotal) * 100}%` }}
            ></div>
            <div className="text-red-400 z-10">{order.price.toFixed(2)}</div>
            <div className="text-right z-10">{order.amount.toFixed(2)}</div>
            <div className="text-right z-10">{order.total.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Preço atual */}
      <div className="text-center py-2 text-lg font-bold text-white border-y border-gray-700 mb-4">
        {buyOrders.length > 0 ? buyOrders[0].price.toFixed(2) : "0.00"} {quoteAsset}
      </div>

      {/* Ordens de compra */}
      <div className="space-y-1">
        {buyOrders.map((order, index) => (
          <div key={`buy-${index}`} className="grid grid-cols-3 relative">
            <div
              className="absolute right-0 h-full bg-green-900 opacity-20"
              style={{ width: `${(order.total / maxTotal) * 100}%` }}
            ></div>
            <div className="text-green-400 z-10">{order.price.toFixed(2)}</div>
            <div className="text-right z-10">{order.amount.toFixed(2)}</div>
            <div className="text-right z-10">{order.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

