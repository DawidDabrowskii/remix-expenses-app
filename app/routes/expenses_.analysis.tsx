import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import expensesStyles from "~/styles/expenses.css?url";
import { ExpensesLayout } from "../layout/expenses.layout";
import { getExpenses } from "~/data/expenses.server";
import { useLoaderData } from "@remix-run/react";

export function ExpensesAnalysisPage() {
  const { expenses } = useLoaderData<typeof loader>();

  return (
    <ExpensesLayout>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </ExpensesLayout>
  );
}

export default ExpensesAnalysisPage;

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

export async function loader() {
  const expenses = await getExpenses();
  return { expenses };
}
