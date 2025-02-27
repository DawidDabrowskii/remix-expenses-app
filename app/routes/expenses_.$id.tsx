import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function ExpensesDetailsPage() {
  const expense = useLoaderData<typeof loader>();

  return <h1>Expenses Details Page {expense}</h1>;
}

export default ExpensesDetailsPage;

export async function loader({ params }: LoaderFunctionArgs) {
  const expenseId = params.id;

  if (!expenseId) {
    throw Response.json(
      { message: `Expense with id ${expenseId} not found` },
      { status: 404 }
    );
  }

  return expenseId;
}
