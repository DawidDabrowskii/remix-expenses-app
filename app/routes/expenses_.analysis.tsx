import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import expensesStyles from "~/styles/expenses.css?url";
import { expenses, ExpensesLayout } from "../layout/expenses.layout";

export function ExpensesAnalysisPage() {
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
