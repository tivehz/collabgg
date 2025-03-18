// Definições de tipos para o projeto Collab

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary"

export interface Skin {
  id: string
  name: string
  image: string
  rarity: Rarity
  price: number // ex. 1.2 (simulando SOL)
  owner: string // "platform" se ainda não vendido
  description: string
  createdAt: number // timestamp
}

export interface Badge {
  id: string
  title: string
  description: string
  criteria: string // ex.: "Buy 3 Rare Skins"
  image: string
  xpRequired?: number // XP necessário para desbloquear (se aplicável)
}

export interface Achievement {
  id: string
  badgeId: string
  unlockedAt: number // timestamp quando foi desbloqueado
}

export interface UserProfile {
  walletAddress: string
  nickname: string
  xp: number
  level: number
  ownedSkins: string[] // Array de IDs de skins
  unlockedBadges: Achievement[]
  transactions: Transaction[]
  joinedAt: number // timestamp
}

export interface Transaction {
  id: string
  skinId: string
  from: string
  to: string
  price: number
  timestamp: number
}

export interface Wallet {
  publicKey: string
  balance: number
}

// Calculadora de nível baseada em XP
export const calculateLevel = (xp: number): number => {
  // A cada 50 XP, o usuário avança um nível
  return Math.floor(xp / 50) + 1
}

// Cores associadas às raridades para UI
export const rarityColors: Record<Rarity, string> = {
  Common: "bg-gray-500",
  Rare: "bg-blue-500",
  Epic: "bg-purple-500",
  Legendary: "bg-yellow-500",
}

// Cores de texto associadas às raridades
export const rarityTextColors: Record<Rarity, string> = {
  Common: "text-gray-500",
  Rare: "text-blue-500",
  Epic: "text-purple-500",
  Legendary: "text-yellow-500",
}

