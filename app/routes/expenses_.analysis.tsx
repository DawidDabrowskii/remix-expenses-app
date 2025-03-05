import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import expensesStyles from "~/styles/expenses.css?url";
import { expenses } from "~/layout/expenses.layout";

export function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export default ExpensesAnalysisPage;

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
