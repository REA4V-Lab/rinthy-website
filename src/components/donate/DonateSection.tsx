
import { useI18n } from "../../i18n/I18nContext";
import { usePerformanceProfile } from "../../hooks/usePerformanceProfile";

const PAYPAL_URL = "https://new.donatepay.ru/@sawiq/payment";
const USDT_TRC20 = "TPHqfb18BAqX7wegakp7sv8e4WWWTuJ4rM";
const TON_USDT = "UQArPRrBLhA3GCyhZt0LUU3AGWsBl6l_L2v9gBUmls3HQyoq";

export default function DonateSection() {
  const { t } = useI18n();
  usePerformanceProfile();


  return (
    <section id="donate" className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-0">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{t.donate.title}</h1>
          <p className="mt-3 text-modrinth-muted">
            {t.donate.description}
          </p>
        </div>


        <div className="space-y-6">
          <div className="rounded-2xl border border-modrinth-border bg-modrinth-card/30 p-5">
            <h2 className="font-semibold text-sm">PayPal</h2>
            <a
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-modrinth-green hover:text-white transition-colors underline underline-offset-4 break-all"
            >
              {PAYPAL_URL}
            </a>
          </div>

          <div className="rounded-2xl border border-modrinth-border bg-modrinth-card/30 p-5">
            <h2 className="font-semibold text-sm">USDT (TRC20)</h2>
            <div className="mt-2 text-sm text-theme-text break-all">
              <code className="font-mono">{USDT_TRC20}</code>
            </div>
          </div>

          <div className="rounded-2xl border border-modrinth-border bg-modrinth-card/30 p-5">
            <h2 className="font-semibold text-sm">TON USDT</h2>
            <div className="mt-2 text-sm text-theme-text break-all">
              <code className="font-mono">{TON_USDT}</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

