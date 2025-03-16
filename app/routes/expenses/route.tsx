import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import ExpensesList from "../../components/expenses/ExpensesList";
import expensesStyles from "../../styles/expenses.css?url";
import { ExpensesLayout } from "~/layout/expenses.layout";

export const expenses = [
  {
    id: "1",
    amount: 123,
    title: "Groceries",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    amount: 123,
    title: "Groceries",
    date: new Date().toISOString(),
  },
  {
    id: "3",
    amount: 123,
    title: "Groceries",
    date: new Date().toISOString(),
  },
  {
    id: "4",
    amount: 123,
    title: "Groceries",
    date: new Date().toISOString(),
  },
];

export default function ExpensesRoute() {
  return (
    <ExpensesLayout>
      <Outlet />
      <ExpensesList expenses={expenses} />
    </ExpensesLayout>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];
