"use client"

import { useState, useEffect } from "react"
import { useFakeWallet } from "@/lib/useFakeWallet"
import { createSkin } from "@/lib/fakeDb"
import type { Rarity } from "@/lib/types"
import Navbar from "@/components/ui/Navbar"
import SkinPreview from "@/components/SkinPreview"
import AiGenerator from "@/components/admin/AiGenerator"

export default function CreateSkin() {
  const { isConnected, connectWallet } = useFakeWallet()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rarity: "Common" as Rarity,
    price: 1.0,
    prompt: "",
  })
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [aiSuggestions, setAiSuggestions] = useState<{
    names: string[]
    descriptions: string[]
  }>({
    names: [],
    descriptions: [],
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  // Verificar se o usuário está conectado
  useEffect(() => {
    if (!isConnected && typeof window !== "undefined") {
      // Não chamamos connectWallet() diretamente no useEffect
    }
  }, [isConnected])

  // Função para aplicar sugestão de nome
  const applyNameSuggestion = (name: string) => {
    setFormData((prev) => ({ ...prev, name }))
  }

  // Função para aplicar sugestão de descrição
  const applyDescriptionSuggestion = (description: string) => {
    setFormData((prev) => ({ ...prev, description }))
  }

  // Função para criar a skin
  const handleCreateSkin = () => {
    if (!formData.name || !formData.description || !generatedImage) {
      alert("Por favor, preencha todos os campos e gere uma imagem")
      return
    }

    setIsCreating(true)

    // Simular um pequeno atraso para dar feedback ao usuário
    setTimeout(() => {
      // Criar a skin
      const newSkin = createSkin({
        name: formData.name,
        description: formData.description,
        rarity: formData.rarity,
        price: formData.price,
        image: generatedImage,
      })

      // Mostrar mensagem de sucesso
      setSuccessMessage(`Skin "${newSkin.name}" criada com sucesso!`)
      setIsCreating(false)

      // Limpar o formulário após 3 segundos
      setTimeout(() => {
        setFormData({
          name: "",
          description: "",
          rarity: "Common",
          price: 1.0,
          prompt: "",
        })
        setGeneratedImage(null)
        setAiSuggestions({ names: [], descriptions: [] })
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  // Manipulador para imagem gerada
  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImage(imageUrl)
  }

  // Manipulador para sugestões geradas
  const handleSuggestionsGenerated = (suggestions: { names: string[]; descriptions: string[] }) => {
    setAiSuggestions(suggestions)
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Conecte sua Carteira</h2>
            <p className="text-gray-400 mb-6">Para criar skins, você precisa conectar sua carteira primeiro.</p>
            <button onClick={connectWallet} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium">
              Conectar Carteira
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Criar Nova Skin com IA</h1>

        {successMessage && <div className="bg-green-900 text-green-100 p-4 rounded-lg mb-6">{successMessage}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de criação */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Detalhes da Skin</h2>

            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-1">Nome</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-1">Descrição</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white h-24"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Raridade</label>
                <select
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.rarity}
                  onChange={(e) => setFormData({ ...formData, rarity: e.target.value as Rarity })}
                >
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Preço (SOL)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <button
              onClick={handleCreateSkin}
              disabled={!formData.name || !formData.description || !generatedImage || isCreating}
              className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md ${
                !formData.name || !formData.description || !generatedImage || isCreating
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isCreating ? "Criando..." : "Criar Skin"}
            </button>
          </div>

          {/* Geração de imagem e texto com IA */}
          <AiGenerator
            onImageGenerated={handleImageGenerated}
            onSuggestionsGenerated={handleSuggestionsGenerated}
            rarity={formData.rarity}
          />
        </div>

        {/* Visualização da imagem gerada */}
        {generatedImage && (
          <div className="mt-6 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Imagem Gerada</h2>
            <div className="bg-gray-700 rounded-lg overflow-hidden h-64 flex items-center justify-center">
              <img
                src={generatedImage || "/placeholder.svg"}
                alt="Skin gerada"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Sugestões de IA */}
        {aiSuggestions.names.length > 0 && (
          <div className="mt-6 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Sugestões de IA</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Nomes Sugeridos</h3>
                <div className="space-y-2">
                  {aiSuggestions.names.map((name, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                      <span>{name}</span>
                      <button
                        onClick={() => applyNameSuggestion(name)}
                        className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                      >
                        Aplicar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Descrições Sugeridas</h3>
                <div className="space-y-2">
                  {aiSuggestions.descriptions.map((desc, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-md">
                      <p className="mb-2">{desc}</p>
                      <button
                        onClick={() => applyDescriptionSuggestion(desc)}
                        className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                      >
                        Aplicar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visualização prévia da skin */}
        {(formData.name || formData.description || generatedImage) && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Visualização da Skin</h2>
            <div className="max-w-md">
              <SkinPreview
                skin={{
                  name: formData.name,
                  description: formData.description,
                  rarity: formData.rarity,
                  price: formData.price,
                  image: generatedImage || undefined,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

