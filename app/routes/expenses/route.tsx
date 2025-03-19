import { LinksFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "../../components/expenses/ExpensesList";
import expensesStyles from "../../styles/expenses.css?url";
import { ExpensesLayout } from "~/layout/expenses.layout";
import { getExpenses } from "~/data/expenses.server";

type SerializedExpense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  dateAdded?: string;
};

export default function ExpensesRoute() {
  const loaderData = useLoaderData<typeof loader>();

  const expensesData = loaderData?.expenses || [];

  return (
    <ExpensesLayout>
      <Outlet />
      <ExpensesList expenses={expensesData} />
    </ExpensesLayout>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];

export async function loader() {
  try {
    const expenses = await getExpenses();

    const serializedExpenses: SerializedExpense[] = expenses.map((expense) => ({
      id: expense.id || "",
      title: expense.title,
      amount: expense.amount,
      date:
        expense.date instanceof Date
          ? expense.date.toISOString()
          : String(expense.date),
      dateAdded:
        expense.dateAdded instanceof Date
          ? expense.dateAdded.toISOString()
          : String(expense.dateAdded),
    }));

    return Response.json({ expenses: serializedExpenses });
  } catch (error) {
    console.error("Failed to load expenses:", error);
    return { expenses: [] };
  }
}
