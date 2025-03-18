// Serviço para lidar com chamadas de API de IA

// Função para gerar imagem usando Pexels (API gratuita com limite)
export async function generateImageWithPexels(prompt: string): Promise<string> {
  try {
    // Simulação de chamada à API - em um ambiente real, você usaria uma chave de API
    // e faria uma chamada real à API do Pexels
    console.log("Buscando imagem relacionada a:", prompt)

    // Como estamos em um ambiente de demonstração, vamos usar imagens estáticas
    // baseadas em palavras-chave do prompt
    const keywords = prompt.toLowerCase()

    if (keywords.includes("futuristic") || keywords.includes("futurística") || keywords.includes("neon")) {
      return "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png"
    } else if (keywords.includes("dragon") || keywords.includes("dragão")) {
      return "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg"
    } else if (keywords.includes("dark") || keywords.includes("escuro")) {
      return "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg"
    } else if (keywords.includes("fire") || keywords.includes("fogo")) {
      return "https://images.pexels.com/photos/3328286/pexels-photo-3328286.jpeg"
    } else if (keywords.includes("water") || keywords.includes("água")) {
      return "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg"
    } else if (keywords.includes("gold") || keywords.includes("ouro")) {
      return "https://images.pexels.com/photos/3685271/pexels-photo-3685271.jpeg"
    } else {
      // Imagem padrão para outros casos
      return "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg"
    }
  } catch (error) {
    console.error("Erro ao gerar imagem:", error)
    throw error
  }
}

// Função para gerar texto usando a API do Gemini (Google)
export async function generateTextWithGemini(prompt: string): Promise<string | null> {
  try {
    // Em um ambiente real, você faria uma chamada à API do Gemini
    // Aqui estamos simulando a resposta para demonstração
    console.log("Gerando texto com Gemini para:", prompt)

    // Simular um pequeno atraso para parecer uma chamada de API real
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Gerar respostas baseadas em palavras-chave do prompt
    const keywords = prompt.toLowerCase()
    let response = ""

    if (prompt.includes("skin") || prompt.includes("weapon")) {
      if (prompt.toLowerCase().includes("legendary")) {
        response = "Devastador Cósmico\nLâmina Celestial\nFúria Ancestral"
      } else if (prompt.toLowerCase().includes("epic")) {
        response = "Caçador Sombrio\nVingança Estelar\nFúria Congelante"
      } else if (prompt.toLowerCase().includes("rare")) {
        response = "Guardião Tático\nSentinela Noturna\nPrecisão Élfica"
      } else {
        response = "Recruta Básico\nIniciante Tático\nPrimeira Arma"
      }
    } else {
      // Resposta genérica
      response = "Nome Gerado pela IA\nOutra Sugestão\nTerceira Opção"
    }

    return response
  } catch (error) {
    console.error("Erro na API do Gemini:", error)
    return null
  }
}

// Função para gerar descrições usando a API do Gemini
export async function generateDescriptionWithGemini(prompt: string, rarity: string): Promise<string | null> {
  try {
    // Simular chamada à API
    console.log("Gerando descrição com Gemini para:", prompt, "raridade:", rarity)

    // Simular um pequeno atraso
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Gerar descrições baseadas na raridade
    let descriptions = ""

    switch (rarity.toLowerCase()) {
      case "legendary":
        descriptions =
          "Uma arma lendária forjada nas profundezas do cosmos, capaz de canalizar o poder das estrelas.\nEsta relíquia ancestral foi passada por gerações de guerreiros, cada um adicionando sua própria essência à sua aura mística.\nDizem que apenas os mais dignos podem empunhar esta arma, que brilha com a intensidade de mil sóis."
        break
      case "epic":
        descriptions =
          "Esta arma épica foi criada por mestres artesãos usando técnicas há muito esquecidas.\nCom detalhes intrincados e materiais raros, esta peça se destaca em qualquer arsenal.\nSua presença no campo de batalha inspira aliados e aterroriza inimigos."
        break
      case "rare":
        descriptions =
          "Uma arma rara com acabamento premium e detalhes únicos.\nSua construção balanceada oferece precisão e poder em igual medida.\nApreciada por colecionadores e guerreiros experientes."
        break
      default: // Common
        descriptions =
          "Uma arma confiável para iniciantes, com design simples mas eficiente.\nFácil de usar e manter, perfeita para quem está começando sua jornada.\nO que falta em ornamentos, compensa em durabilidade."
    }

    return descriptions
  } catch (error) {
    console.error("Erro ao gerar descrição:", error)
    return null
  }
}

// Função para obter uma imagem aleatória do Picsum (totalmente gratuito)
export async function getRandomImage(width = 400, height = 320): Promise<string> {
  // Picsum Photos é um serviço gratuito que fornece imagens aleatórias
  // Não requer autenticação e é muito confiável
  const randomId = Math.floor(Math.random() * 1000)
  return `https://picsum.photos/id/${randomId}/${width}/${height}`
}

