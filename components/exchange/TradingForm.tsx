"use client"

import { useState, useEffect } from "react"
import { useFakeWallet } from "@/lib/useFakeWallet"

interface TradingFormProps {
  type: "buy" | "sell"
  orderType: "limit" | "market"
  baseAsset: string
  quoteAsset: string
  currentPrice: number
}

export default function TradingForm({ type, orderType, baseAsset, quoteAsset, currentPrice }: TradingFormProps) {
  const { wallet } = useFakeWallet()
  const [price, setPrice] = useState(currentPrice.toString())
  const [amount, setAmount] = useState("")
  const [total, setTotal] = useState("")
  const [sliderValue, setSliderValue] = useState(0)

  // Atualizar preço quando o preço atual mudar
  useEffect(() => {
    setPrice(currentPrice.toString())
  }, [currentPrice])

  // Calcular total quando preço ou quantidade mudar
  useEffect(() => {
    if (price && amount) {
      const calculatedTotal = Number.parseFloat(price) * Number.parseFloat(amount)
      setTotal(calculatedTotal.toFixed(2))
    } else {
      setTotal("")
    }
  }, [price, amount])

  // Calcular quantidade quando total mudar diretamente
  const handleTotalChange = (value: string) => {
    setTotal(value)
    if (value && price && Number.parseFloat(price) > 0) {
      const calculatedAmount = Number.parseFloat(value) / Number.parseFloat(price)
      setAmount(calculatedAmount.toFixed(4))
    }
  }

  // Lidar com mudança no slider
  const handleSliderChange = (value: number) => {
    setSliderValue(value)

    // Calcular quantidade com base na porcentagem do saldo
    if (wallet) {
      const maxAmount = type === "buy" ? wallet.balance / Number.parseFloat(price || "1") : 10 // Simulando que o usuário tem 10 unidades do ativo base

      const newAmount = ((maxAmount * value) / 100).toFixed(4)
      setAmount(newAmount)
    }
  }

  // Processar ordem
  const handleSubmitOrder = () => {
    if (!price || !amount) return

    const orderDetails = {
      type,
      orderType,
      price: orderType === "market" ? "Mercado" : Number.parseFloat(price),
      amount: Number.parseFloat(amount),
      total: Number.parseFloat(total || "0"),
      baseAsset,
      quoteAsset,
    }

    console.log("Ordem enviada:", orderDetails)

    // Aqui você implementaria a lógica real de envio da ordem
    alert(`Ordem de ${type === "buy" ? "compra" : "venda"} enviada com sucesso!`)

    // Resetar formulário
    setAmount("")
    setTotal("")
    setSliderValue(0)
  }

  return (
    <div>
      {/* Preço (apenas para ordens limite) */}
      {orderType === "limit" && (
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Preço ({quoteAsset})</label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>
      )}

      {/* Quantidade */}
      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-1">Quantidade ({baseAsset})</label>
        <input
          type="number"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.0001"
          min="0"
        />
      </div>

      {/* Slider para porcentagem do saldo */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number.parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Total */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-1">Total ({quoteAsset})</label>
        <input
          type="number"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          value={total}
          onChange={(e) => handleTotalChange(e.target.value)}
          step="0.01"
          min="0"
        />
      </div>

      {/* Informações de saldo */}
      <div className="text-sm text-gray-400 mb-4">
        <div className="flex justify-between">
          <span>Saldo disponível:</span>
          <span>
            {type === "buy" ? `${wallet?.balance.toFixed(2) || "0.00"} ${quoteAsset}` : `10.00 ${baseAsset}`}{" "}
            {/* Valor simulado */}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Taxa:</span>
          <span>0.1%</span>
        </div>
      </div>

      {/* Botão de enviar ordem */}
      <button
        onClick={handleSubmitOrder}
        className={`w-full py-3 rounded-md font-medium ${
          type === "buy" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {type === "buy" ? "Comprar" : "Vender"} {baseAsset}
      </button>
    </div>
  )
}

