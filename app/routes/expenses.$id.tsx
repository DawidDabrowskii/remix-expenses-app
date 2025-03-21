import {
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  getExpense,
  updateExpense,
  deleteExpense,
} from "../data/expenses.server";
import Modal from "../components/util/Modal";
import ExpenseForm, {
  links as expenseFormLinks,
} from "../components/expenses/ExpenseForm";
import expensesStyles from "../styles/expenses.css?url";

export default function ExpenseDetailsPage() {
  const navigate = useNavigate();
  useLoaderData<typeof loader>();

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

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw Response.json({ message: "Invalid expense ID" }, { status: 404 });
  }

  try {
    const expense = await getExpense(id);
    return Response.json(expense);
  } catch (error) {
    throw Response.json(
      { message: `Expense with ID ${id} not found` },
      { status: 404 }
    );
  }
}

export async function action({ params, request }: ActionFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw Response.json({ message: "Invalid expense ID" }, { status: 400 });
  }

  if (request.method === "DELETE") {
    await deleteExpense(id);
    return redirect("/expenses");
  }

  const formData = await request.formData();

  if (request.method === "PATCH") {
    const expenseData = {
      title: formData.get("title") as string,
      amount: parseFloat(formData.get("amount") as string),
      date: new Date(formData.get("date") as string),
    };

    try {
      await updateExpense(id, expenseData);
      return redirect("/expenses");
    } catch (error) {
      return Response.json(
        { error: "Failed to update expense" },
        { status: 500 }
      );
    }
  }
}
