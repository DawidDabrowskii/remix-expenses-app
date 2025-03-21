import { LinksFunction } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";

import expensesStyles from "~/styles/expenses.css?url";

type Expense = {
  title: string;
  amount: number | string;
  date: string;
};

function ExpenseForm() {
  const validationErrors = useActionData();
  const loaderData = useLoaderData();
  const params = useParams();
  const today = new Date().toISOString().slice(0, 10);
  const navigation = useNavigation();

  if (params.id && !loaderData) {
    <div>Invalid expense id</div>;
  }

  const defaultValues =
    loaderData && typeof loaderData === "object" && "title" in loaderData
      ? {
          title: (loaderData as Expense).title,
          amount:
            typeof (loaderData as Expense).amount === "number"
              ? (loaderData as Expense).amount.toString()
              : (loaderData as Expense).amount,
          date: (loaderData as Expense).date?.slice(0, 10) || "",
        }
      : {
          title: "",
          amount: "",
          date: "",
        };

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method={loaderData ? "patch" : "post"}
      className="form"
      id="expense-form"
    >
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
            defaultValue={defaultValues.date}
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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];
