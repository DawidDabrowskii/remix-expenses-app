import { ExpensesLayout } from "~/layout/expenses.layout";
import expensesStyles from "~/styles/expenses.css?url";

export function ExpensesRawPage() {
  return (
    <ExpensesLayout>
      <h1>Expenses Raw Page</h1>
    </ExpensesLayout>
  );
}

export default ExpensesRawPage;

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
