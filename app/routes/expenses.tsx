import { Outlet } from "@remix-run/react";
import { ExpensesLayout } from "~/layout/expenses.layout";
import expensesStyles from "~/styles/expenses.css?url";

export function ExpensesPage() {
  return (
    <ExpensesLayout>
      <Outlet />
    </ExpensesLayout>
  );
}

export default ExpensesPage;

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
