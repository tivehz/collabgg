import { type Skin, rarityColors } from "@/lib/types"

interface SkinPreviewProps {
  skin: Partial<Skin>
}

export default function SkinPreview({ skin }: SkinPreviewProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="h-48 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center">
          {skin.image ? (
            <img
              src={skin.image || "/placeholder.svg"}
              alt={skin.name || "Skin preview"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-500">Sem imagem</div>
          )}
        </div>
        {skin.rarity && (
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${
              rarityColors[skin.rarity]
            } bg-opacity-90`}
          >
            {skin.rarity}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 truncate">{skin.name || "Nome da Skin"}</h3>
        <p className="text-gray-400 text-sm h-10 overflow-hidden">
          {skin.description || "Descrição da skin aparecerá aqui."}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-1">Preço:</span>
            <span className="text-white font-medium">{skin.price?.toFixed(2) || "0.00"} SOL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

