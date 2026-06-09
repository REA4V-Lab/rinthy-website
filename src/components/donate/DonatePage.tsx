export default function DonatePage() {

  return (
    <section className="pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Donate
          </h1>
          <p className="mt-3 text-modrinth-muted">
            Thank you for supporting Rinthy.
            <span className="block mt-2 text-xs">Payments:</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-modrinth-border bg-modrinth-card/30 p-5">
            <h2 className="font-semibold text-sm">PayPal</h2>
            <a
              href="https://new.donatepay.ru/@sawiq/payment"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-modrinth-green hover:text-white transition-colors underline underline-offset-4 break-all"
            >
              https://new.donatepay.ru/@sawiq/payment
            </a>
          </div>

          <div className="rounded-2xl border border-modrinth-border bg-modrinth-card/30 p-5">
            <h2 className="font-semibold text-sm">USDT (TRC20)</h2>
            <div className="mt-2 text-sm text-theme-text break-all">
              <code className="font-mono">TPHqfb18BAqX7wegakp7sv8e4WWWTuJ4rM</code>
            </div>
          </div>

          <div className="rounded-2xl border border-modrinth-border bg-modrinth-card/30 p-5">
            <h2 className="font-semibold text-sm">TON USDT</h2>
            <div className="mt-2 text-sm text-theme-text break-all">
              <code className="font-mono">UQArPRrBLhA3GCyhZt0LUU3AGWsBl6l_L2v9gBUmls3HQyoq</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

