"use client"

import { useState, useEffect } from "react"
import type { Wallet, Badge, UserProfile } from "./types"
import { buySkin, setUserWallet, getUserProfile, getAllBadges } from "./fakeDb"

interface WalletState {
  wallet: Wallet | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  userProfile: UserProfile | null
}

interface UseFakeWalletReturn extends WalletState {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  purchaseSkin: (skinId: string) => Promise<boolean>
  getUserBadges: () => { badge: Badge; unlockedAt: number }[]
  refreshProfile: () => void
}

const WALLET_STORAGE_KEY = "collab_wallet"

export function useFakeWallet(): UseFakeWalletReturn {
  const [state, setState] = useState<WalletState>({
    wallet: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    userProfile: null,
  })

  // Função para atualizar o perfil do usuário
  const refreshProfile = () => {
    if (state.isConnected) {
      const profile = getUserProfile()
      setState((prev) => ({ ...prev, userProfile: profile }))
    }
  }

  // Verifica a carteira salva no primeiro carregamento
  useEffect(() => {
    // Verificamos se estamos no lado do cliente antes de acessar localStorage
    if (typeof window !== "undefined") {
      const savedWallet = localStorage.getItem(WALLET_STORAGE_KEY)
      if (savedWallet) {
        try {
          const parsedWallet = JSON.parse(savedWallet) as Wallet

          // Configura o perfil de usuário com o endereço da carteira
          setUserWallet(parsedWallet.publicKey)
          const profile = getUserProfile()

          setState({
            wallet: parsedWallet,
            isConnected: true,
            isConnecting: false,
            error: null,
            userProfile: profile,
          })
        } catch (error) {
          console.error("Falha ao analisar carteira salva:", error)
          localStorage.removeItem(WALLET_STORAGE_KEY)
        }
      }
    }
  }, []) // Mantemos o array de dependências vazio

  // Gera um endereço de carteira falso
  const generateWalletAddress = (): string => {
    const chars = "0123456789abcdef"
    let result = "0x"
    for (let i = 0; i < 40; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Conecta carteira (simulado)
  const connectWallet = async (): Promise<void> => {
    if (state.isConnected) return

    setState((prev) => ({ ...prev, isConnecting: true, error: null }))

    try {
      // Simula atraso de conexão
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cria carteira falsa
      const newWallet: Wallet = {
        publicKey: generateWalletAddress(),
        balance: 10.0, // Começa com 10 tokens
      }

      // Salva no localStorage
      localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(newWallet))

      // Configura o perfil de usuário com o endereço da carteira
      setUserWallet(newWallet.publicKey)
      const profile = getUserProfile()

      setState({
        wallet: newWallet,
        isConnected: true,
        isConnecting: false,
        error: null,
        userProfile: profile,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: "Falha ao conectar carteira",
      }))
    }
  }

  // Desconecta carteira
  const disconnectWallet = (): void => {
    localStorage.removeItem(WALLET_STORAGE_KEY)
    setState({
      wallet: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      userProfile: null,
    })
  }

  // Compra uma skin
  const purchaseSkin = async (skinId: string): Promise<boolean> => {
    if (!state.wallet || !state.isConnected) {
      setState((prev) => ({ ...prev, error: "Carteira não conectada" }))
      return false
    }

    try {
      // Simula atraso de transação
      await new Promise((resolve) => setTimeout(resolve, 800))

      const success = buySkin(skinId)

      if (!success) {
        setState((prev) => ({ ...prev, error: "Falha ao comprar skin" }))
        return false
      }

      // Atualiza saldo da carteira (simulado)
      const updatedWallet = {
        ...state.wallet,
        balance: Math.max(0, state.wallet.balance - 0.1), // Deduz taxa de transação
      }

      localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(updatedWallet))

      // Atualiza o perfil do usuário
      const profile = getUserProfile()

      setState((prev) => ({
        ...prev,
        wallet: updatedWallet,
        userProfile: profile,
        error: null,
      }))

      return true
    } catch (error) {
      setState((prev) => ({ ...prev, error: "Transação falhou" }))
      return false
    }
  }

  // Obtém badges do usuário com informações completas
  const getUserBadges = () => {
    if (!state.userProfile) return []

    const allBadges = getAllBadges()
    return state.userProfile.unlockedBadges.map((achievement) => {
      const badge = allBadges.find((b) => b.id === achievement.badgeId)
      if (!badge) throw new Error(`Badge ${achievement.badgeId} não encontrado`)

      return {
        badge,
        unlockedAt: achievement.unlockedAt,
      }
    })
  }

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    purchaseSkin,
    getUserBadges,
    refreshProfile,
  }
}

