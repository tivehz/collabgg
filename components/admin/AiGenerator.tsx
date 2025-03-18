"use client"

import { useState } from "react"
import type { Rarity } from "@/lib/types"
import {
  generateImageWithPexels,
  generateTextWithGemini,
  generateDescriptionWithGemini,
  getRandomImage,
} from "@/lib/aiService"

interface AiGeneratorProps {
  onImageGenerated: (imageUrl: string) => void
  onSuggestionsGenerated: (suggestions: { names: string[]; descriptions: string[] }) => void
  rarity: Rarity
}

export default function AiGenerator({ onImageGenerated, onSuggestionsGenerated, rarity }: AiGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiInfo, setApiInfo] = useState<string | null>(null)

  // Função para gerar imagem
  const generateImage = async () => {
    if (!prompt) {
      alert("Por favor, insira um prompt para gerar a imagem")
      return
    }

    setIsGeneratingImage(true)
    setError(null)
    setApiInfo("Conectando à API de imagens...")

    try {
      // Primeiro, tentar com a API do Pexels
      let imageUrl = ""
      try {
        imageUrl = await generateImageWithPexels(prompt)
        setApiInfo("Imagem gerada com a API do Pexels")
      } catch (pexelsError) {
        console.error("Erro com Pexels, tentando alternativa:", pexelsError)
        // Fallback para Picsum (totalmente gratuito e confiável)
        imageUrl = await getRandomImage()
        setApiInfo("Usando imagem aleatória do Picsum (fallback)")
      }

      onImageGenerated(imageUrl)
    } catch (err) {
      console.error("Erro ao gerar imagem:", err)
      setError("Não foi possível gerar a imagem. Usando imagem de fallback.")

      // Fallback para imagens locais em caso de erro
      const rarityImages = {
        Common: "/placeholder.svg?height=320&width=400",
        Rare: "/placeholder.svg?height=320&width=400",
        Epic: "/placeholder.svg?height=320&width=400",
        Legendary:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u9629791682_hdr_--ar_11_--v_6.1_efa419a1-8277-49c9-9d8c-28d80cbfd9cf_0-JHxKKS6zIKLznZXrbvOfcZkV3H8p8X.png",
      }
      onImageGenerated(rarityImages[rarity])
      setApiInfo("Usando imagem local de fallback")
    } finally {
      setIsGeneratingImage(false)
      // Limpar a mensagem de API após 3 segundos
      setTimeout(() => setApiInfo(null), 3000)
    }
  }

  // Função para gerar sugestões
  const generateSuggestions = async () => {
    if (!prompt) {
      alert("Por favor, insira um prompt para gerar sugestões")
      return
    }

    setIsGeneratingSuggestions(true)
    setError(null)
    setApiInfo("Conectando à API do Gemini para gerar sugestões...")

    try {
      // Gerar nomes com a API do Gemini
      const namesText = await generateTextWithGemini(
        `Generate 3 names for a ${rarity.toLowerCase()} skin based on: ${prompt}`,
      )

      // Gerar descrições com a API do Gemini
      const descriptionsText = await generateDescriptionWithGemini(prompt, rarity)

      if (namesText || descriptionsText) {
        // Processar os resultados
        const names = namesText
          ? namesText.split("\n").filter((line) => line.trim().length > 0)
          : [`${rarity} ${prompt.split(" ")[0]} Skin`]

        const descriptions = descriptionsText
          ? descriptionsText.split("\n").filter((line) => line.trim().length > 0)
          : [`Uma skin ${rarity.toLowerCase()} inspirada em ${prompt}.`]

        onSuggestionsGenerated({
          names: names.length > 0 ? names : [`${rarity} ${prompt.split(" ")[0]} Skin`],
          descriptions:
            descriptions.length > 0 ? descriptions : [`Uma skin ${rarity.toLowerCase()} inspirada em ${prompt}.`],
        })

        setApiInfo("Sugestões geradas com sucesso usando Gemini!")
      } else {
        throw new Error("Não foi possível gerar sugestões")
      }
    } catch (err) {
      console.error("Erro ao gerar sugestões:", err)
      setError("Não foi possível gerar sugestões. Usando geração local.")

      // Fallback para geração local
      fallbackGeneration()
      setApiInfo("Usando geração local de sugestões (fallback)")
    } finally {
      setIsGeneratingSuggestions(false)
      // Limpar a mensagem de API após 3 segundos
      setTimeout(() => setApiInfo(null), 3000)
    }
  }

  // Geração local como fallback
  const fallbackGeneration = () => {
    // Gerar sugestões baseadas no prompt e raridade
    const rarityPrefix = {
      Common: ["Básico", "Iniciante", "Simples"],
      Rare: ["Raro", "Especial", "Valioso"],
      Epic: ["Épico", "Extraordinário", "Poderoso"],
      Legendary: ["Lendário", "Mítico", "Supremo"],
    }

    // Gerar nomes baseados no prompt e raridade
    const generateNames = () => {
      const prefix = rarityPrefix[rarity]
      const promptWords = prompt.split(" ").filter((word) => word.length > 3)
      const names = []

      for (let i = 0; i < 3; i++) {
        const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)]
        const randomWord =
          promptWords.length > 0
            ? promptWords[Math.floor(Math.random() * promptWords.length)]
            : ["Assassino", "Caçador", "Guerreiro", "Fantasma"][Math.floor(Math.random() * 4)]

        names.push(`${randomPrefix} ${randomWord} ${Math.floor(Math.random() * 100)}`)
      }

      return names
    }

    // Gerar descrições baseadas no prompt e raridade
    const generateDescriptions = () => {
      const rarityDesc = {
        Common: ["básica", "simples", "para iniciantes"],
        Rare: ["rara", "especial", "de colecionador"],
        Epic: ["épica", "extraordinária", "de elite"],
        Legendary: ["lendária", "mítica", "suprema"],
      }

      const adjective = rarityDesc[rarity]
      const descriptions = []

      for (let i = 0; i < 3; i++) {
        const randomAdj = adjective[Math.floor(Math.random() * adjective.length)]
        descriptions.push(`Skin ${randomAdj} inspirada em ${prompt}. Perfeita para mostrar seu estilo único no jogo.`)
      }

      return descriptions
    }

    onSuggestionsGenerated({
      names: generateNames(),
      descriptions: generateDescriptions(),
    })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Geração com IA</h2>

      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-1">Prompt para IA</label>
        <textarea
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white h-24"
          placeholder="Descreva a skin que você deseja criar, ex: 'Uma skin futurística com detalhes em neon azul e roxo'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={generateImage}
          disabled={isGeneratingImage || !prompt}
          className={`flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md ${
            isGeneratingImage || !prompt ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isGeneratingImage ? "Gerando..." : "Gerar Imagem"}
        </button>
        <button
          onClick={generateSuggestions}
          disabled={isGeneratingSuggestions || !prompt}
          className={`flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md ${
            isGeneratingSuggestions || !prompt ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isGeneratingSuggestions ? "Gerando..." : "Gerar Sugestões"}
        </button>
      </div>

      {error && <div className="bg-red-900 bg-opacity-50 text-red-200 p-3 rounded-md mb-4">{error}</div>}

      {apiInfo && <div className="bg-blue-900 bg-opacity-50 text-blue-200 p-3 rounded-md mb-4">{apiInfo}</div>}

      <div className="text-sm text-gray-400 bg-gray-700 p-3 rounded-md">
        <p className="font-medium text-white mb-1">Dicas para melhores resultados:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Seja específico sobre o tema e estilo da skin</li>
          <li>Mencione cores, texturas e elementos visuais</li>
          <li>Inclua referências a jogos ou personagens populares</li>
          <li>Especifique o tipo de arma ou equipamento</li>
        </ul>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>Usando APIs gratuitas: Pexels/Picsum para imagens e Gemini para texto</p>
      </div>
    </div>
  )
}

