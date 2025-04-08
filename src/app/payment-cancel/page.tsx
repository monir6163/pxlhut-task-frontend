/* eslint-disable @typescript-eslint/no-explicit-any */
// app/payment-cancel/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export default async function PaymentCancelPage({ searchParams }: any) {
  const sessionId = await searchParams?.session_id;
  if (!sessionId) {
    redirect("/payments");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      redirect("/payment-success?session_id=" + sessionId);
    }

    return (
      <div className="m-2 w-full max-w-md min-h-screen bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
        <p className="text-red-800 font-bold text-lg text-center">
          ❌ Payment Canceled
        </p>
        <p className="text-red-700 text-center">
          You canceled the payment for: <br />
          <span className="font-semibold">{session.customer_email}</span>
        </p>
        <Link
          href="/payments"
          className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1"
        >
          Go To Payments
        </Link>
      </div>
    );
  } catch (err) {
    if (err) {
      redirect("/payments");
    }
  }
}
