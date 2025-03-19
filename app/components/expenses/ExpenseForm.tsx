import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { loader } from "~/routes/expenses_.$id";

function ExpenseForm() {
  const validationErrors = useActionData();
  const expenseData = useLoaderData<typeof loader>();
  const today = new Date().toISOString().slice(0, 10);
  const navigation = useNavigation();

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  console.log("expenseData", expenseData);

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues?.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues?.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ""
            }
          />
        </p>
      </div>

      {!!validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        {isSubmitting ? (
          <button disabled>Submitting...</button>
        ) : (
          <>
            <button>Save Expense</button>
            <Link to="/expenses">Cancel</Link>
          </>
        )}
      </div>
    </Form>
  );
}

export default ExpenseForm;
