import ExpensesList from "~/components/expenses/ExpensesList";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "~/styles/expenses.css?url";

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

type ExpensesLayoutProps = {
  children: React.ReactNode;
};

export function ExpensesLayout({ children }: ExpensesLayoutProps) {
  return (
    <>
      <ExpensesHeader />
      <main>
        {children}
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
