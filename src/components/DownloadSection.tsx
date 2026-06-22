import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslation } from "../i18n/I18nContext";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";
import { useState } from "react";

function AndroidIcon({ className }: { className?: string }) {
  return (
    <div
      className={`bg-center bg-no-repeat bg-contain rounded-xl ${className ?? ""}`}
      style={{ backgroundImage: "url('/androidlogo.svg')", backgroundSize: "60%" }}
    />
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.22 7.13-.57 1.5-1.31 2.99-2.27 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function DownloadCard({
  icon: Icon,
  title,
  description,
  buttonText,
  href,
  onClick,
  disabled = false,
  delay = 0,
  iconSize = "w-6 h-6",
  containerSize = "w-12 h-12",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  delay?: number;
  iconSize?: string;
  containerSize?: string;
}) {
  const { enableAnimations } = usePerformanceProfile();

  const animationProps = enableAnimations
    ? {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  const cardClass = disabled
    ? "card-glass opacity-70"
    : "card-glass border-modrinth-green/20 hover:border-modrinth-green/40 transition-all duration-500";

  const iconClass = disabled
    ? `${containerSize} rounded-2xl bg-white/5 flex items-center justify-center`
    : `${containerSize} rounded-2xl bg-modrinth-green/10 flex items-center justify-center`;

  const titleClass = disabled
    ? "font-display font-bold text-xl mb-2 text-white/60"
    : "font-display font-bold text-xl mb-2";

  const buttonClass = disabled
    ? "btn-secondary opacity-50 cursor-not-allowed"
    : "btn-primary w-full justify-center";

  const ButtonComponent = disabled ? "button" : "a";
  const buttonProps = disabled
    ? { disabled: true }
    : href
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { type: "button" as const, onClick };

  return (
    <motion.div {...animationProps} className={cardClass}>
      <div className="flex flex-col items-center text-center gap-5">
        <div className={iconClass}>
          <Icon className={`${iconSize} ${disabled ? "text-white/60" : "text-modrinth-green"}`} />
        </div>
        <div>
          <h3 className={titleClass}>{title}</h3>
          <p className="text-sm text-modrinth-muted">{description}</p>
        </div>
        <ButtonComponent {...buttonProps} className={buttonClass}>
          {disabled ? (
            buttonText
          ) : (
            <>
              <Download size={18} />
              {buttonText}
            </>
          )}
        </ButtonComponent>
      </div>
    </motion.div>
  );
}

export default function DownloadSection() {
  const t = useTranslation();
  const { enableAnimations } = usePerformanceProfile();
  const [iosLoading, setIosLoading] = useState(false);
  const [androidLoading, setAndroidLoading] = useState(false);

  const headerAnimationProps = enableAnimations
    ? {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  const handleIosClick = async () => {
    setIosLoading(true);
    const releaseUrl = "https://github.com/imsawiq/Rinthy/releases/latest";
    try {
      const res = await fetch("https://api.github.com/repos/imsawiq/Rinthy/releases/latest", {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      if (!res.ok) {
        window.location.href = releaseUrl;
        setIosLoading(false);
        return;
      }

      const release = await res.json();
      const ipaAsset = (release?.assets ?? []).find((a: any) =>
        typeof a?.name === "string" && a.name.toLowerCase().endsWith(".ipa"),
      );

      window.location.href = ipaAsset?.browser_download_url ?? releaseUrl;
    } catch {
      window.location.href = releaseUrl;
    } finally {
      setIosLoading(false);
    }
  };

  return (
    <section id="download" className="section">
      <div className="section-container">
        <motion.div
          {...headerAnimationProps}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-modrinth-green tracking-wide uppercase mb-6 border border-modrinth-green/20">
            {t.download.badge}
          </span>
          <h2 className="text-section-title mb-6">
            {t.download.title}
          </h2>
          <p className="text-section-subtitle max-w-2xl mx-auto">
            {t.download.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <DownloadCard
            icon={AndroidIcon}
            title={t.download.android.title}
            description={t.download.android.desc}
            buttonText={t.download.android.button}
            onClick={async () => {
              const releaseUrl = "https://github.com/imsawiq/Rinthy/releases/latest";
              try {
                const res = await fetch("https://api.github.com/repos/imsawiq/Rinthy/releases/latest", {
                  headers: {
                    Accept: "application/vnd.github+json",
                  },
                });

                if (!res.ok) {
                  window.location.href = releaseUrl;
                  return;
                }

                const release = await res.json();
                const apkAsset = (release?.assets ?? []).find((a: any) =>
                  typeof a?.name === "string" && a.name.toLowerCase().endsWith(".apk"),
                );

                window.location.href = apkAsset?.browser_download_url ?? releaseUrl;
              } catch {
                window.location.href = releaseUrl;
              }
            }}
            iconSize="w-8 h-8"
            containerSize="w-16 h-16"
            delay={0.1}
          />

          <DownloadCard
            icon={AppleIcon}
            title={t.download.ios.title}
            description={t.download.ios.desc}
            buttonText={iosLoading ? "Loading..." : t.download.ios.button}
            onClick={handleIosClick}
            disabled={false}
            delay={0.1}
            iconSize="w-8 h-8"
            containerSize="w-16 h-16"
          />
        </div>
      </div>
    </section>
  );
}