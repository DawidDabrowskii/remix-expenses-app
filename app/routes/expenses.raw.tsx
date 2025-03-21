import { getExpenses } from "../data/expenses.server";

export async function loader() {
  const expenses = await getExpenses();
  return expenses;
}
