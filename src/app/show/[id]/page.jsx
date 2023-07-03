import Nav from "@/components/Nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

/* const { data: users } = await supabase.from("userTransactions").select(`
    *,

`); */
export default async function Page({ params }) {
  console.log(params);
  const supabase = createServerComponentClient({ cookies });
  const { data: transactions } = await supabase
    .from("transactions")
    .select(
      `
  *,
  groups (
    groupname
  ),
  users(username)
`
    )
    .eq("transactionId", params.id);

  const { data: userTransactions } = await supabase
    .from("userTransaction")
    .select(
      `
    *,
    users(username)
    `
    )
    .eq("transactionId", params.id);

  const dateObj = new Date(Date.parse(transactions[0].createdAt));
  const day = dateObj.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(dateObj);
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const formattedDate = `${day}. ${month} ${year}, ${hours}:${minutes}`;
  return (
    <>
      <Nav />
      <h2>{transactions[0].groups.groupname}</h2>
      <div className="container overlay">
        <h3>{transactions[0].title}</h3>
        <p>{formattedDate}</p>
        {/* <ul>{transactions?.map((transaction) => transaction.userTransaction.map((ut) => <li key={ut.transactionId}>{ut.userId}</li>))}</ul> */}
        <ul>
          {userTransactions?.map((ut) => (
            <li key={ut.userTransactionId} className="flex-list">
              <span>{ut.users.username}</span>
              <span className="negative"> {ut.amount}</span>
            </li>
          ))}
          <li id="sum" className="flex-list">
            <span>{transactions[0].users.username}</span>
            <span class="positive">{transactions[0].total}€</span>
          </li>
        </ul>
        <p className="center-ui">
          <Link href="/" className="button">
            back
          </Link>
        </p>
      </div>
    </>
  );
}
