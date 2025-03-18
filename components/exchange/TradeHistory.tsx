"use client"

interface Trade {
  price: number
  amount: number
  total: number
  timestamp: string
  type: "buy" | "sell"
}

interface TradeHistoryProps {
  trades: Trade[]
  quoteAsset: string
}

export default function TradeHistory({ trades, quoteAsset }: TradeHistoryProps) {
  return (
    <div className="text-sm">
      {/* Cabeçalho */}
      <div className="grid grid-cols-4 text-gray-400 mb-2">
        <div>Preço ({quoteAsset})</div>
        <div className="text-right">Quantidade</div>
        <div className="text-right">Total</div>
        <div className="text-right">Hora</div>
      </div>

      {/* Lista de trades */}
      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
        {trades.map((trade, index) => (
          <div key={`trade-${index}`} className="grid grid-cols-4">
            <div className={trade.type === "buy" ? "text-green-400" : "text-red-400"}>{trade.price.toFixed(2)}</div>
            <div className="text-right">{trade.amount.toFixed(2)}</div>
            <div className="text-right">{trade.total.toFixed(2)}</div>
            <div className="text-right text-gray-400">{trade.timestamp}</div>
          </div>
        ))}

        {trades.length === 0 && <div className="text-center py-4 text-gray-500">Nenhum trade recente</div>}
      </div>
    </div>
  )
}

