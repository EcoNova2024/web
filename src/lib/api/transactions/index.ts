import { apiFetch } from ".."
import { Transaction, AddTransactionRequest } from "./models"

const BASE_END_POINT = "transactions"

export async function addTransaction(itemId: string, data: AddTransactionRequest) {
  return await apiFetch<Transaction>({
    method: "POST",
    endpoint: `${BASE_END_POINT}/${itemId}`,
    payload: data,
  })
}
