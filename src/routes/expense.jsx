import { Form, useLoaderData, useFetcher, } from "react-router-dom";
import { getExpense, updateExpense, } from "../expenses";

export async function action({ request, params }) {
    const formData = await request.formData();
    return updateExpense(params.expenseId, {
      favorite: formData.get("favorite") === "true",
    });
  }

export async function loader({ params }) {
    const expense = await getExpense(params.expenseId);
    if (!expense) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { expense };
}

export default function Expense() {
    const { expense } = useLoaderData();

    return (
        <div id="expense">

            <div>
                <h1>
                    {expense.first || expense.last ? (
                        <>
                            {expense.first} {expense.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite expense={expense} />
                </h1>

                {expense.notes && <p>{expense.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ expense }) {
    const fetcher = useFetcher();
    const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : expense.favorite;

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
