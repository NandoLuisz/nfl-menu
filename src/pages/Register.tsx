import { useEffect, useState } from "react"
// import { updateFood } from "./api/edit-food";
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Toast } from "./ui/Toast"
import { foodFormSchema, type FoodFormFields } from "@/model/schemaFood"
import { ListFilter } from "lucide-react"

import data from "@/data.json"
import type { FoodResponse } from "@/model/foodModel"

const inputBase = "outline-none rounded-3xl px-4 py-2 transition-colors"
const inputError = "border-2 border-red-500 bg-red-50"
const inputNormal = "bg-zinc-200"

const categories = [
  { value: "pizza", label: "Pizza" },
  { value: "hamburguer", label: "Hamburguer" },
  { value: "pastel", label: "Pastel" },
  { value: "batata", label: "Batata Frita" },
  { value: "hotDog", label: "Cachorro Quente" },
  { value: "bread", label: "Pão Árabe" },
  { value: "Refrigerantes", label: "Refrigerante" },
  { value: "Sucos", label: "Suco" },
  { value: "Vitaminas", label: "Vitamina" },
]

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodFormFields>({
    resolver: zodResolver(foodFormSchema),
  })

  const [products] = useState<FoodResponse[]>(data)
  const [filter, setFilter] = useState("")
  const [toastSucessfullyEdit, setToastSucessfullyEdit] = useState(false)
  const [toastSucessfullyRegister, setToastSucessfullyRegister] = useState(false)
  const [toastWarningRegister, setToastWarningRegister] = useState(false)
  const [toastDeleteRegister, setToastDeleteRegister] = useState(false)

  const onSubmit: SubmitHandler<FoodFormFields> = async (data) => {
    // try {
    //   const response = await foodFetch.post("foods", data)

    //   if (response.status === 200 || response.status === 201) {
    //     setToastSucessfullyRegister(true)
    //     reset()
    //   }
    // } catch (error) {
    //   setToastWarningRegister(true)
    // }
    console.log(data)
  }

  useEffect(() => {
    if (
      toastSucessfullyEdit ||
      toastSucessfullyRegister ||
      toastWarningRegister ||
      toastDeleteRegister
    ) {
      const timer = setTimeout(() => {
        setToastSucessfullyEdit(false)
        setToastSucessfullyRegister(false)
        setToastWarningRegister(false)
        setToastDeleteRegister(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toastSucessfullyEdit, toastSucessfullyRegister, toastWarningRegister, toastDeleteRegister])

  return (
    <main className="w-full h-full flex gap-5">
      {toastSucessfullyRegister && <Toast text="Cadastro feito com sucesso!" />}
      {toastWarningRegister && <Toast text="Preencha o formulário corretamente!" color="yellow" />}
      {toastDeleteRegister && <Toast text="Cadastro deletado com sucesso!" color="red" />}
      <form
        className="w-[40%] min-h-fit bg-amber-200 rounded-lg flex flex-col items-center gap-6 px-5 py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Título"
            {...register("title")}
            className={`${inputBase} ${errors.title ? inputError : inputNormal}`}
          />
          {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Descrição"
            {...register("description")}
            className={`${inputBase} ${errors.description ? inputError : inputNormal}`}
          />
          {errors.description && (
            <span className="text-sm text-red-600">{errors.description.message}</span>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="URL da imagem"
            {...register("image")}
            className={`${inputBase} ${errors.image ? inputError : inputNormal}`}
          />
          {errors.image && <span className="text-sm text-red-600">{errors.image.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="number"
            step="0.01"
            placeholder="Preço"
            {...register("price", { valueAsNumber: true })}
            className={`${inputBase} ${errors.price ? inputError : inputNormal}`}
          />
          {errors.price && <span className="text-sm text-red-600">{errors.price.message}</span>}
        </div>

        <div className="w-full flex flex-col items-start gap-2">
          <span className="font-bold text-amber-950">Selecione o tipo:</span>
          <div className="grid grid-cols-2 gap-2 w-full">
            {categories.map((category) => (
              <label
                key={category.value}
                className="text-amber-950 flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  {...register("type")}
                  value={category.value}
                  className="accent-orange-700"
                />
                {category.label}
              </label>
            ))}
          </div>
          {errors.type && <span className="text-sm text-red-600 mt-1">{errors.type.message}</span>}
        </div>

        <div className="w-full mt-4">
          <button
            type="submit"
            className="w-full bg-orange-700 hover:bg-orange-800 transition-colors py-2 rounded-lg text-white font-bold"
          >
            Cadastrar
          </button>
        </div>
      </form>
      <div className="w-full flex flex-col gap-4">
        <div className="w-[30%] flex items-center justify-between border rounded-3xl bg-zinc-200 gap-2 text-amber-950 px-3 py-2">
          <ListFilter />
          <input
            placeholder="Filtrar"
            className="outline-none bg-transparent w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 max-h-170 overflow-y-auto pr-2">
          {products
            .filter(
              (item) =>
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
                item.description.toLowerCase().includes(filter.toLowerCase()) ||
                item.type.toLowerCase().includes(filter.toLowerCase()),
            )
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-orange-400 px-4 py-3 rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex flex-1 items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">{item.title}</span>
                    <span className="text-sm text-zinc-700">{item.description}</span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm uppercase text-zinc-800">{item.type}</span>
                    <span className="font-bold text-lg">R$ {item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
