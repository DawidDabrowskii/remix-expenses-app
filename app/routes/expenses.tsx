import { Outlet } from "@remix-run/react";
import { ExpensesLayout } from "~/layout/expenses.layout";

export function ExpensesPage() {
  return (
    <ExpensesLayout>
      <Outlet />
    </ExpensesLayout>
  );
}

export default ExpensesPage;
