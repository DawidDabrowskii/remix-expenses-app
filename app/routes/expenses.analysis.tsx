import { LinksFunction } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import Chart from "../components/expenses/Chart";
import ExpenseStatistics from "../components/expenses/ExpenseStatistics";
import expensesStyles from "../styles/expenses.css?url";

type ExpensesLoaderData = {
  expenses: {
    id: string;
    title: string;
    amount: number;
    date: string;
    dateAdded?: string;
  }[];
};

export default function ExpensesAnalysisPage() {
  const matches = useMatches();

  const expensesMatch = matches.find((match) =>
    match.id.includes("routes/expenses")
  );

  const expensesData = expensesMatch?.data as ExpensesLoaderData | undefined;
  const expenses = expensesData?.expenses || [];

  return (
    <div>
      {expenses.length > 0 ? (
        <>
          <Chart expenses={expenses} />
          <ExpenseStatistics expenses={expenses} />
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          No expenses found. Add some expenses to see the analysis.
        </p>
      )}
    </div>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];
