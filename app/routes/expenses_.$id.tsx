import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ExpensesLayout } from "~/layout/expenses.layout";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import expensesStyles from "~/styles/expenses.css?url";
import Modal from "~/components/util/Modal";

export function ExpensesDetailsPage() {
  const expense = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  function closeHandler() {
    navigate("/expenses");
  }

  return (
    <ExpensesLayout>
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
      <h1>Expenses Details Page {expense}</h1>
    </ExpensesLayout>
  );
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

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
