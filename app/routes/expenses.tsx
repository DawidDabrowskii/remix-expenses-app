import { LinksFunction } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";
import expensesStyles from "../styles/expenses.css?url";
import { ExpensesLayout } from "../layout/expenses.layout";
import { getExpenses } from "../data/expenses.server";

// Export this type for use in child routes
export type SerializedExpense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  dateAdded?: string;
};

export default function ExpensesRoute() {
  const location = useLocation();
  const loaderData = useLoaderData<typeof loader>();
  const expensesData = loaderData?.expenses || [];

  // Check if we're on the analysis page
  const isAnalysisRoute = location.pathname.includes("/analysis");

  const isExpensiveListEmpty = expensesData.length === 0;

  return (
    <ExpensesLayout>
      {/* Only show expenses list if not on analysis page */}
      {!isAnalysisRoute && isExpensiveListEmpty && (
        <section id="no-expenses">
          <p>No expenses found. Start adding some!</p>
          <p>
            <Link to="/expenses/add">Add Expense</Link>
          </p>
        </section>
      )}
      {!isAnalysisRoute && !isExpensiveListEmpty && (
        <ExpensesList expenses={expensesData} />
      )}
      <Outlet />
    </ExpensesLayout>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];

export async function loader() {
  try {
    const expenses = await getExpenses();

    const serializedExpenses: SerializedExpense[] = expenses.map((expense) => ({
      id: expense.id || "",
      title: expense.title,
      amount: expense.amount,
      date:
        expense.date instanceof Date
          ? expense.date.toISOString()
          : String(expense.date),
      dateAdded:
        expense.dateAdded instanceof Date
          ? expense.dateAdded.toISOString()
          : String(expense.dateAdded),
    }));

    return Response.json({ expenses: serializedExpenses }, { status: 200 });
  } catch (error) {
    console.error("Failed to load expenses:", error);
    throw new Error("Failed to load expenses");
  }
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }

  return <p>An unknown error occurred!</p>;
}
