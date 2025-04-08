/* eslint-disable @typescript-eslint/no-explicit-any */
// app/payment-success/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export default async function PaymentSuccessPage({ searchParams }: any) {
  const sessionId = await searchParams?.session_id;

  if (!sessionId) {
    redirect("/payments");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      redirect("/payments");
    }

    return (
      <div className="m-2 w-full max-w-md min-h-screen bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
        <p className="text-green-800 font-bold text-lg text-center">
          ✅ Payment Successful!
        </p>
        <p>Thank you for your donation, {session.customer_email}!</p>
        <Link
          href="/payments"
          className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
        >
          Make Another Donation
        </Link>
      </div>
    );
  } catch (error) {
    if (error) {
      redirect("/payments");
    }
  }
}
