import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import { ExpensesLayout } from "~/layout/expenses.layout";
import expensesStyles from "~/styles/expenses.css?url";

export function ExpensesAddPage() {
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

export default ExpensesAddPage;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const expenseData = {
    title: formData.get("title") as string,
    amount: parseFloat(formData.get("amount") as string),
    date: new Date(formData.get("date") as string),
  };

  const validatedData = {
    title: expenseData.title,
    amount: expenseData.amount.toString(),
    date: expenseData.date.toISOString().slice(0, 10),
  };

  try {
    validateExpenseInput(validatedData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData);
  return redirect("/expenses");
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
