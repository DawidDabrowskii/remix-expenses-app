import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
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

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
