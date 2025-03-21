import { ActionFunctionArgs, LinksFunction, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm, {
  links as expenseFormLinks,
} from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { addExpense } from "../data/expenses.server";
import expensesStyles from "../styles/expenses.css?url";

export default function ExpensesAddPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("/expenses");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export const links: LinksFunction = () => [
  ...expenseFormLinks(),
  { rel: "stylesheet", href: expensesStyles },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const expenseData = {
    title: formData.get("title") as string,
    amount: parseFloat(formData.get("amount") as string),
    date: new Date(formData.get("date") as string),
  };

  try {
    await addExpense(expenseData);
    return redirect("/expenses");
  } catch (error) {
    console.error("Failed to add expense:", error);
    return Response.json({ error: "Failed to add expense" }, { status: 500 });
  }
}
