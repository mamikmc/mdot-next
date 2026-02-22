import { designConfig } from "@/app/config/design";

export default function Footer() {
  return (
    <footer
      className={`${designConfig.footer.bg} ${designConfig.footer.pattern} text-white py-8 relative`}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <p className="text-white">
          © {new Date().getFullYear()} mdot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
