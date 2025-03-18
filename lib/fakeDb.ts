import type { Skin, Badge, UserProfile, Transaction, Achievement } from "./types"

// Adicionar uma nova skin premium com a imagem da pessoa
const initialSkins: Skin[] = [
  {
    id: "skin-001",
    name: "Fallen 2024 Lendário",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Legendary",
    price: 5.0,
    owner: "platform",
    description: "Skin exclusiva inspirada no lendário jogador Fallen, edição 2024",
    createdAt: Date.now(),
  },
  {
    id: "skin-002",
    name: "AWP Dragon Lore",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Legendary",
    price: 7.5,
    owner: "platform",
    description: "Uma das skins mais raras e desejadas de AWP no universo CS",
    createdAt: Date.now(),
  },
  {
    id: "skin-003",
    name: "Team Ruby Tigers",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Rare",
    price: 1.2,
    owner: "platform",
    description: "Skin oficial do time Ruby Tigers, com detalhes em vermelho vibrante",
    createdAt: Date.now(),
  },
  {
    id: "skin-004",
    name: "Phantom Stealth",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Epic",
    price: 3.5,
    owner: "platform",
    description: "Skin escura com detalhes em neon, perfeita para missões noturnas",
    createdAt: Date.now(),
  },
  {
    id: "skin-005",
    name: "FNX Signature",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Epic",
    price: 3.0,
    owner: "platform",
    description: "Skin assinada por FNX, com detalhes em ouro e acabamento premium",
    createdAt: Date.now(),
  },
  {
    id: "skin-006",
    name: "Imperial Classic",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Rare",
    price: 1.5,
    owner: "platform",
    description: "Skin clássica do time Imperial, com as cores verde e amarelo em destaque",
    createdAt: Date.now(),
  },
  {
    id: "skin-007",
    name: "Starter Pack",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Common",
    price: 0.5,
    owner: "platform",
    description: "Skin básica para novos jogadores, com design simples mas eficiente",
    createdAt: Date.now(),
  },
  {
    id: "skin-008",
    name: "CS Veteran",
    image: "/placeholder.svg?height=320&width=400",
    rarity: "Common",
    price: 0.7,
    owner: "platform",
    description: "Skin com visual retrô, homenageando as primeiras versões do CS",
    createdAt: Date.now(),
  },
  {
    id: "skin-009",
    name: "Neon Huntress",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u9629791682_hdr_--ar_11_--v_6.1_efa419a1-8277-49c9-9d8c-28d80cbfd9cf_0-JHxKKS6zIKLznZXrbvOfcZkV3H8p8X.png",
    rarity: "Legendary",
    price: 8.5,
    owner: "platform",
    description: "Skin exclusiva com estética cyberpunk e detalhes em neon roxo. Edição limitada.",
    createdAt: Date.now(),
  },
]

// Dados iniciais de badges
const initialBadges: Badge[] = [
  {
    id: "badge-001",
    title: "Colecionador Iniciante",
    description: "Comprou sua primeira skin",
    criteria: "Comprar 1 skin de qualquer raridade",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "badge-002",
    title: "Caçador de Raridades",
    description: "Adquiriu uma skin lendária",
    criteria: "Comprar uma skin de raridade Legendary",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "badge-003",
    title: "Trader Experiente",
    description: "Realizou 5 transações no marketplace",
    criteria: "Completar 5 transações de compra",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "badge-004",
    title: "Nível 3 Alcançado",
    description: "Atingiu o Nível 3",
    criteria: "Acumular 100 XP",
    xpRequired: 100,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "badge-005",
    title: "Coleção Inicial",
    description: "Possui 3 skins diferentes",
    criteria: "Ter 3 skins diferentes em sua coleção",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "badge-006",
    title: "Fã de Epic",
    description: "Possui 2 skins Epic",
    criteria: "Ter 2 skins de raridade Epic",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "badge-007",
    title: "Membro Fundador",
    description: "Participou do lançamento da plataforma",
    criteria: "Cadastrou-se durante o período inicial",
    image: "/placeholder.svg?height=64&width=64",
  },
]

// Perfil de usuário inicial (vazio)
let userProfile: UserProfile = {
  walletAddress: "",
  nickname: "Player",
  xp: 0,
  level: 1,
  ownedSkins: [],
  unlockedBadges: [],
  transactions: [],
  joinedAt: Date.now(),
}

// Clone dos dados iniciais para manipulação
let skins = [...initialSkins]
let badges = [...initialBadges]
let transactions: Transaction[] = []

// Getters
export const getAllSkins = () => {
  return [...skins]
}

export const getAvailableSkins = () => {
  return skins.filter((skin) => skin.owner === "platform")
}

export const getUserSkins = (walletAddress: string) => {
  return skins.filter((skin) => skin.owner === walletAddress)
}

export const getSkinById = (id: string) => {
  return skins.find((skin) => skin.id === id)
}

export const getAllBadges = () => {
  return [...badges]
}

export const getUserProfile = () => {
  return { ...userProfile }
}

export const getUserTransactions = () => {
  return [...userProfile.transactions]
}

// Setters e manipuladores
export const setUserWallet = (walletAddress: string) => {
  userProfile.walletAddress = walletAddress
  userProfile.nickname = `Player_${walletAddress.substring(2, 8)}`

  // Adiciona badge de membro fundador automaticamente
  unlockBadge("badge-007")

  return getUserProfile()
}

export const buySkin = (skinId: string): boolean => {
  const skinIndex = skins.findIndex((skin) => skin.id === skinId)

  if (skinIndex === -1) return false
  if (skins[skinIndex].owner !== "platform") return false
  if (!userProfile.walletAddress) return false

  // Processa a compra
  const skin = skins[skinIndex]
  skins[skinIndex] = { ...skin, owner: userProfile.walletAddress }

  // Adiciona a skin à coleção do usuário
  userProfile.ownedSkins.push(skinId)

  // Adiciona XP ao usuário (+5 por compra, +10 se for rara ou mais)
  const xpGain = skin.rarity === "Common" ? 5 : 10
  addXp(xpGain)

  // Registra a transação
  const transaction: Transaction = {
    id: `tx-${Date.now()}`,
    skinId,
    from: "platform",
    to: userProfile.walletAddress,
    price: skin.price,
    timestamp: Date.now(),
  }

  transactions.push(transaction)
  userProfile.transactions.push(transaction)

  // Verifica conquistas após a compra
  checkAchievements()

  return true
}

export const addXp = (amount: number) => {
  const oldLevel = userProfile.level
  userProfile.xp += amount
  userProfile.level = Math.floor(userProfile.xp / 50) + 1

  // Se mudou de nível, verifica conquistas
  if (userProfile.level > oldLevel) {
    checkAchievements()
  }

  return userProfile.xp
}

export const unlockBadge = (badgeId: string) => {
  // Verifica se o badge já está desbloqueado
  if (userProfile.unlockedBadges.some((achievement) => achievement.badgeId === badgeId)) {
    return false
  }

  // Adiciona a conquista ao perfil do usuário
  const achievement: Achievement = {
    id: `achievement-${Date.now()}`,
    badgeId,
    unlockedAt: Date.now(),
  }

  userProfile.unlockedBadges.push(achievement)
  return true
}

// Verificação de conquistas baseada no estado atual
export const checkAchievements = () => {
  // Badge: Colecionador Iniciante
  if (userProfile.ownedSkins.length >= 1) {
    unlockBadge("badge-001")
  }

  // Badge: Caçador de Raridades
  const hasLegendary = userProfile.ownedSkins.some((skinId) => {
    const skin = getSkinById(skinId)
    return skin && skin.rarity === "Legendary"
  })

  if (hasLegendary) {
    unlockBadge("badge-002")
  }

  // Badge: Trader Experiente
  if (userProfile.transactions.length >= 5) {
    unlockBadge("badge-003")
  }

  // Badge: Nível 3 Alcançado
  if (userProfile.xp >= 100) {
    unlockBadge("badge-004")
  }

  // Badge: Coleção Inicial
  if (userProfile.ownedSkins.length >= 3) {
    unlockBadge("badge-005")
  }

  // Badge: Fã de Epic
  const epicSkins = userProfile.ownedSkins.filter((skinId) => {
    const skin = getSkinById(skinId)
    return skin && skin.rarity === "Epic"
  })

  if (epicSkins.length >= 2) {
    unlockBadge("badge-006")
  }

  return userProfile.unlockedBadges
}

// Criação de novas skins (admin)
export const createSkin = (skinData: Omit<Skin, "id" | "owner" | "createdAt">): Skin => {
  const newSkin: Skin = {
    ...skinData,
    id: `skin-${Date.now()}`,
    owner: "platform",
    createdAt: Date.now(),
  }

  skins.push(newSkin)
  return newSkin
}

// Reset do estado para testes
export const resetState = () => {
  skins = [...initialSkins]
  badges = [...initialBadges]
  transactions = []
  userProfile = {
    walletAddress: "",
    nickname: "Player",
    xp: 0,
    level: 1,
    ownedSkins: [],
    unlockedBadges: [],
    transactions: [],
    joinedAt: Date.now(),
  }
}

