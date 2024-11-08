import { Outlet, Link, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit, } from "react-router-dom"
import { getExpenses, createExpense } from "../expenses";
import { useContext } from "react";
import { ThemeContext } from "../context/context";
import { useEffect } from "react";
import Logout from "./Logout";

// function toggleTheme () {
//     const { theme } = useContext(ThemeContext);
//     console.log("je suis dans le toggle", theme)
//     return (
//         <div>
//             <h1>{theme}</h1>
//             <p style={{ color: theme === "light" ? "red" : "blue"}}>
//                 Some text
//             </p>
//         </div>
//     )
// }

export async function action() {
    const expense = await createExpense();
    return redirect(`/expenses/${expense.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const expenses = await getExpenses(q);
    return { expenses, q };
}

export default function Root() {
    const { expenses, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();
    const theme = useContext(ThemeContext)

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    function toggleTheme() {
        theme.setTheme(theme.theme === 'Light' ? 'Dark' : 'Light')
    }
    return (
        <>
            <div id="sidebar">
                <h1>React Router Expenses</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search expenses"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}

                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                    <Form method="post">
                        <button type="submit"><Logout /></button>
                    </Form>
                    {/* <button>{toggleTheme()} </button> */}
                </div>
                <nav>
                    {expenses.length ? (
                        <ul>
                            {expenses.map((expense) => (
                                <li key={expense.id}>
                                    <NavLink to={`expenses/${expense.id}`} className={({ isActive, isPending }) =>
                                        isActive ? "active" : isPending ? "pending" : ""}>
                                        <Link to={`expenses/${expense.id}`}>
                                            {expense.first || expense.last ? (
                                                <>
                                                    {expense.first} {expense.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {expense.favorite && <span>★</span>}
                                        </Link>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No expenses</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
            }>
                <Outlet />
            </div>
        </>
    );
}
