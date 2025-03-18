"use client"

import { useState, useEffect } from "react"
import { useFakeWallet } from "@/lib/useFakeWallet"
import Dashboard from "@/components/Dashboard"
import Navbar from "@/components/ui/Navbar"

export default function Home() {
  const { isConnected, connectWallet } = useFakeWallet()
  const [showDashboard, setShowDashboard] = useState(false)

  // Verificar se o usuário já está conectado para mostrar o dashboard
  useEffect(() => {
    if (isConnected) {
      setShowDashboard(true)
    }
  }, [isConnected])

  // Função para conectar carteira e mostrar dashboard
  const handleConnectAndShow = async () => {
    await connectWallet()
    setShowDashboard(true)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {showDashboard ? (
        <Dashboard />
      ) : (
        <div className="flex flex-col items-center">
          {/* Hero Section */}
          <section className="w-full py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collab.PNG-UIwgOLq9Uadv8fRbSeKvP9C4aSES15.png"
                      alt="Collab Logo"
                      className="h-12 w-12 mr-3"
                    />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                      Collab
                    </h1>
                  </div>
                  <p className="text-xl md:text-2xl font-semibold text-white mb-4">
                    Plataforma de Skins Digitais com Benefícios Reais
                  </p>
                  <p className="text-lg text-gray-300 mb-8">
                    Colecione skins exclusivas inspiradas em CS:GO, ganhe XP, desbloqueie badges e mostre suas
                    conquistas no seu perfil.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleConnectAndShow}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg text-lg shadow-lg transform transition hover:scale-105"
                    >
                      Conectar Carteira
                    </button>
                    <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg text-lg border border-gray-700">
                      Explorar Marketplace
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="aspect-w-1 aspect-h-1">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 rounded-lg blur-xl"></div>
                      <div className="absolute top-5 left-5 right-5 bottom-5 bg-gray-800 rounded-lg shadow-2xl p-4 overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u9629791682_hdr_--ar_11_--v_6.1_efa419a1-8277-49c9-9d8c-28d80cbfd9cf_0-JHxKKS6zIKLznZXrbvOfcZkV3H8p8X.png"
                          alt="Collab User"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full py-16 px-4 bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-12">Características Principais</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="w-14 h-14 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Coleção de Skins</h3>
                  <p className="text-gray-400">
                    Adquira skins exclusivas com diferentes raridades: Common, Rare, Epic e Legendary. Cada uma tem seu
                    design único.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="w-14 h-14 bg-purple-900 bg-opacity-50 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Badges e Conquistas</h3>
                  <p className="text-gray-400">
                    Desbloqueie badges únicas ao completar desafios na plataforma, como adquirir skins raras ou atingir
                    níveis de XP.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="w-14 h-14 bg-green-900 bg-opacity-50 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sistema de XP e Níveis</h3>
                  <p className="text-gray-400">
                    Ganhe XP com cada transação e aumente seu nível. Níveis mais altos desbloqueiam recursos exclusivos
                    e status especial.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="w-full py-16 px-4 bg-gray-800">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Conecte sua Carteira</h3>
                  <p className="text-gray-400 mb-8">
                    Conecte sua carteira para começar a colecionar e gerenciar suas skins.
                  </p>
                  {/* Linha conectora */}
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-blue-600 -z-10"></div>
                </div>

                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Explore o Marketplace</h3>
                  <p className="text-gray-400 mb-8">
                    Descubra skins disponíveis com diferentes raridades e características.
                  </p>
                  {/* Linha conectora */}
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-blue-600 -z-10"></div>
                </div>

                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Colecione Skins</h3>
                  <p className="text-gray-400 mb-8">Adquira skins para sua coleção e ganhe XP com cada compra.</p>
                  {/* Linha conectora */}
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-blue-600 -z-10"></div>
                </div>

                <div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-3">Desbloqueie Badges</h3>
                  <p className="text-gray-400 mb-8">Complete desafios e desbloquie badges para exibir em seu perfil.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-16 px-4 bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8 md:p-12 shadow-xl">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar sua coleção?</h2>
                  <p className="text-lg text-gray-200 mb-8">
                    Conecte sua carteira, comece a colecionar skins exclusivas e desbloqueie conquistas únicas.
                  </p>
                  <button
                    onClick={handleConnectAndShow}
                    className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg text-lg shadow-md hover:bg-gray-100 transform transition hover:scale-105"
                  >
                    Conectar e Começar
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

