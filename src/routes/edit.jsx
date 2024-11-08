import { Form, useLoaderData, redirect, useNavigate,} from "react-router-dom";
import { updateExpense } from "../expenses";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateExpense(params.expenseId, updates);
    return redirect(`/expenses/${params.expenseId}`);
  }

export default function EditExpense() {
  const { expense } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="expense-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={expense?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={expense?.last}
        />
      </p>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={expense?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => { navigate(-1); }}> Cancel</button>
      </p>
    </Form>
  );
}
