import { Form, Link, useFetcher } from "@remix-run/react";

type ExpenseListItemProps = {
  title: string;
  amount: number;
  id: string;
};

function ExpenseListItem({ title, amount, id }: ExpenseListItemProps) {
  const fetcher = useFetcher();

  function deleteExpenseItemHandler() {
    const proceed = confirm("Are you sure? Do you want to delete this item?");
    if (!proceed) {
      return;
    }
    fetcher.submit(null, { method: "delete", action: `/expenses/${id}` });
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <Form method="delete" action={`/expenses/${id}`}>
          <button type="submit" onClick={deleteExpenseItemHandler}>
            Delete
          </button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
