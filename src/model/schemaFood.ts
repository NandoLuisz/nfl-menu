import { z } from "zod"

export const foodFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "O título deve ter no mínimo 5 caracteres")
    .max(20, "O título pode ter no máximo 20 caracteres"),

  description: z
    .string()
    .trim()
    .min(5, "A descrição deve ter pelo menos 5 caracteres")
    .max(40, "A descrição pode ter no máximo 40 caracteres"),

  image: z.string().url("Informe uma URL válida para a imagem"),

  // Solução para o Preço: z.coerce resolve o problema do NaN e do TypeScript
  price: z.coerce
    .number({
      invalid_type_error: "O preço deve ser um número",
    })
    .min(0.01, "O preço deve ser de pelo menos 0,01")
    .max(10000, "O preço não pode exceder 10.000"),

  // Solução para o Enum: Removi o objeto de erro de dentro do z.enum e
  // usei o método .or() ou o errorMap de forma que o TS aceite.
  type: z.enum(
    [
      "pizza",
      "hamburguer",
      "pastel",
      "batata",
      "hotDog",
      "bread",
      "Refrigerantes",
      "Sucos",
      "Vitaminas",
    ],
    {
      // Esta é a única forma que o z.enum aceita mensagens customizadas sem erro de overload
      errorMap: (issue: { code: string }, ctx: { defaultError: unknown }) => {
        if (issue.code === "invalid_enum_value" || issue.code === "invalid_type") {
          return { message: "Selecione um tipo de produto" }
        }
        return { message: ctx.defaultError }
      },
    },
  ),
})
