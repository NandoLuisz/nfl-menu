import { Search } from "lucide-react"

export default function Header() {
  return (
    <div className="w-full h-[10vh] flex justify-between items-start">
      <div className="flex items-center justify-between border rounded-3xl bg-zinc-200 gap-2 text-amber-950 px-2 py-2">
        <Search />
        <input placeholder="Pesquisar..." className="outline-none"></input>
      </div>
      <div className="flex items-center justify-center bg-amber-200 rounded-full gap-2 text-amber-950">
        <img
          src="https://github.com/NandoLuisz.png"
          alt="Foto de perfil do GitHub"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col pr-4">
          <span className="text-sm">Bem-vindo</span>
          <span className="font-semibold">Luis Fernando</span>
        </div>
      </div>
    </div>
  )
}
