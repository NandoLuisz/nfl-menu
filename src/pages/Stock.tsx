import { Button } from "@/components/ui/button"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { categoriesStock } from "@/model/categoriesStock"
import { stockSchema, type StockFormData } from "@/model/schemaStock"

import { statusStyles, stockItems, type Stock } from "@/model/stockModel"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"

import { useState } from "react"
import { useForm } from "react-hook-form"

const units = ["un", "kg", "g", "l", "ml"]

const statuses: Stock["status"][] = ["ok", "baixo", "esgotado"]

export default function Stock() {
  function onSubmit(data: StockFormData) {
    if (!stockProductDetails) return

    setStockProducts((prev) =>
      prev.map((item) => (item.id === stockProductDetails.id ? { ...item, ...data } : item)),
    )

    setModalDetailsStockProduct(false)
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
  })
  const [stockProducts, setStockProducts] = useState<Stock[]>(stockItems)
  const [modalDetailsStockProduct, setModalDetailsStockProduct] = useState<boolean>(false)
  const [stockProductDetails, setStockProductDetails] = useState<Stock | null>(null)

  function filter(type: string) {
    setStockProducts(stockItems.filter((product) => product.type === type))
  }

  return (
    <div className="w-full h-full flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`
          fixed top-0 right-0 h-full w-100 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out px-2 py-2
          ${modalDetailsStockProduct ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="w-full flex justify-end">
          <X className="cursor-pointer" onClick={() => setModalDetailsStockProduct(false)} />
        </div>
        <div>
          <img
            src={stockProductDetails?.image}
            alt={stockProductDetails?.name}
            className="w-full rounded"
          />
          <div className="w-full flex flex-col gap-2">
            <label className="text-[10px]">Nome</label>
            <input type="text" {...register("name")} className="border rounded-3xl px-3 py-2" />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            <label className="text-[10px]">Quantidade</label>
            <input
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              className="border rounded-3xl px-3 py-2"
            />
            {errors.quantity && (
              <span className="text-red-500 text-xs">{errors.quantity.message}</span>
            )}
            <label className="text-[10px]">Quantidade mínima</label>
            <input
              type="number"
              {...register("minQuantity", { valueAsNumber: true })}
              className="border rounded-3xl px-3 py-2"
            />
            <label className="text-[10px]">Unidade</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {stockProductDetails?.unit}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-50 p-2">
                {units.map((unit) => (
                  <div
                    key={unit}
                    className="cursor-pointer px-2 py-1 hover:bg-zinc-100"
                    onClick={() => {
                      setValue("unit", unit as "un" | "kg" | "g" | "l" | "ml", {
                        shouldValidate: true,
                      })
                      setStockProductDetails((prev) => (prev ? { ...prev, unit: unit } : prev))
                    }}
                  >
                    {unit}
                  </div>
                ))}
              </PopoverContent>
            </Popover>

            {errors.unit && <span className="text-red-500 text-xs">{errors.unit.message}</span>}

            <label className="text-[10px]">Status</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {stockProductDetails?.status || "Selecione uma opção"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-50 p-2">
                <ul className="flex flex-col gap-1">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        setValue("status", status, { shouldValidate: true })
                        setStockProductDetails((prev) =>
                          prev ? { ...prev, status: status } : prev,
                        )
                      }}
                      className="cursor-pointer px-2 py-1 hover:bg-zinc-100"
                    >
                      {status}
                    </div>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <label className="text-[10px]">Tipo</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {stockProductDetails?.type || "Selecione uma opção"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-50 p-2">
                <ul className="flex flex-col gap-1">
                  {categoriesStock.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setValue("type", option.value, { shouldValidate: true })
                        setStockProductDetails((prev) =>
                          prev ? { ...prev, type: option.value } : prev,
                        )
                      }}
                      className="cursor-pointer px-2 py-1 hover:bg-zinc-100"
                    >
                      {option.value}
                    </div>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Salvar alterações
        </Button>
      </form>

      <span className="text-lg font-semibold">Categorias</span>

      <div className="w-full grid grid-cols-6 gap-4 mt-4">
        {categoriesStock.map((category) => (
          <div
            key={category.value}
            className={`bg-zinc-200 w-50 h-30 rounded flex flex-col items-center justify-center gap-2 cursor-pointer ${category.textColorHover}`}
            onClick={() => filter(category.value)}
          >
            <span>{category.icon}</span>

            <span>{category.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-zinc-800 text-white text-sm">
                <th className="px-4 py-3 text-left">Produto</th>

                <th className="px-4 py-3 text-center">Quantidade</th>

                <th className="px-4 py-3 text-center">Unidade</th>

                <th className="px-4 py-3 text-center">Mínimo</th>

                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {stockProducts.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-none hover:bg-zinc-100 transition"
                  onClick={() => {
                    setModalDetailsStockProduct(true)
                    setStockProductDetails(item)
                    reset({
                      name: item.name,
                      quantity: item.quantity,
                      minQuantity: item.minQuantity,
                      unit: item.unit as "un" | "kg" | "g" | "l" | "ml",
                      status: item.status,
                      type: item.type,
                      image: item.image,
                    })
                  }}
                >
                  <td className="px-4 py-3 font-medium text-zinc-800">{item.name}</td>

                  <td className="px-4 py-3 text-center">{item.quantity}</td>

                  <td className="px-4 py-3 text-center">{item.unit}</td>

                  <td className="px-4 py-3 text-center">{item.minQuantity}</td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
