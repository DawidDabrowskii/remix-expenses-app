import ExpensesList from "~/components/expenses/ExpensesList";

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
    <main>
      {children}
      <ExpensesList expenses={expenses} />
    </main>
  );
}
