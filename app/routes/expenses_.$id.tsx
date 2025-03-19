import { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpensesLayout } from "~/layout/expenses.layout";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import expensesStyles from "~/styles/expenses.css?url";
import Modal from "~/components/util/Modal";
import { getExpense } from "~/data/expenses.server";

export function ExpensesDetailsPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("/expenses");
  }

  return (
    <ExpensesLayout>
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    </ExpensesLayout>
  );
}

export default ExpensesDetailsPage;

export async function loader({ params }: LoaderFunctionArgs) {
  const expenseId = params.id;
  const expense = await getExpense(expenseId ?? "");

  return expense;
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
