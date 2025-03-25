import { Link, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "~/styles/expenses.css?url";
import { loader } from "~/routes/expenses";

type ExpensesLayoutProps = {
  children: React.ReactNode;
};

export function ExpensesLayout({ children }: ExpensesLayoutProps) {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <ExpensesHeader user={user} />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw" className="button">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {children}
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
