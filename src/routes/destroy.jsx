import { redirect } from "react-router-dom";
import { deleteExpense } from "../expenses";

export async function action({ params }) {
  await deleteExpense(params.expenseId);
  return redirect("/");
}
