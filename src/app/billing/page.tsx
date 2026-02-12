export default function BillingPage({
  searchParams,
}: {
  searchParams: { success?: string; canceled?: string };
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">Billing</h1>

      {searchParams.success ? (
        <p className="mt-3 rounded-lg border border-green-500/30 bg-green-500/10 p-3">
          Subscription started. (Webhook will mark you active.)
        </p>
      ) : null}

      {searchParams.canceled ? (
        <p className="mt-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
          Checkout canceled.
        </p>
      ) : null}

      <p className="mt-4 opacity-80">
        Next: we’ll connect Stripe webhooks and lock the AI Assistant behind Pro.
      </p>
    </main>
  );
}
