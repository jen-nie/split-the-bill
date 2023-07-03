import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Nav from "@/components/Nav";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: transactions } = await supabase.from("transactions").select(`
      *,
      users (
        userId, username
      )
    `);

  console.log(transactions);
  return (
    <>
      <Nav />
      <main>
        <h2>Italien Urlaub</h2>
        <div className="overlay">
          <div id="overview">
            <h2>Overview</h2>
            <ul></ul>
          </div>
          <div id="expenses" className="overlay">
            <h2>Expenses</h2>

            <ul>
              {transactions?.map((transaction) => (
                <Link href={`/show/${transaction.transactionId}`} className="flex-list two-row-list">
                  <li key={transaction.transactionId}>
                    <p className="expense-title">{transaction.title}</p>
                    <p>{transaction.users.username}</p>
                    <p className="flex-right">{transaction.total}.00€</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
