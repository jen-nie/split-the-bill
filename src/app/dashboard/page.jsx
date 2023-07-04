"use client";

import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import Nav from "@/components/Nav";
import { useState, useEffect } from "react";

export default async function Index() {
  const { data: transactions } = await supabase.from("transactions").select(`
      *,
      users (
        userId, username
      )
    `);

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
            <Link href="/add">
              <button>Add new expense</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
