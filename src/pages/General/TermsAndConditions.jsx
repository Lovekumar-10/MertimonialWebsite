import React from "react";
import { 
  Scale, 
  UserCheck, 
  ShieldAlert, 
  MessageSquare, 
  Ban, 
  AlertCircle, 
  FileCheck,
  Globe,
  Handshake
} from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="w-full pt-40 min-h-screen px-4 sm:px-6 md:px-16 lg:px-40 py-12 bg-[var(--bg-main)] font-[var(--ff-primary)]">
      <header className="text-center mb-12">
        <Scale
          className="mx-auto mb-4"
          style={{
            width: "clamp(3rem, 4vw, 6rem)",
            height: "clamp(3rem, 4vw, 6rem)",
            color: "var(--color-primary)", 
          }}
        />
        <h1
          style={{
            fontFamily: "var(--ff-primary)",
            fontSize: "var(--fs-h1)",
            fontWeight: "var(--fw-bold)",
            color: "var(--color-primary)",
            lineHeight: 1.2,
          }}
        >
          Terms & Conditions
        </h1>
        <p
          style={{
            fontFamily: "var(--ff-secondary)",
            fontSize: "var(--fs-body)",
            color: "var(--text-secondary)",
            opacity: 0.8,
            marginTop: "1rem",
          }}
        >
          Last updated: February 2026
        </p>
      </header>

      {/* 1. Acceptance of Terms */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Handshake className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Acceptance of Agreement
          </h2>
        </div>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            By accessing or using <span className="font-semibold text-[var(--color-primary)]">LoveLink</span>, 
            you agree to be bound by these Terms and Conditions. Our platform is designed to connect individuals for 
            meaningful relationships, and your use of the service signifies your acceptance of these rules. If you 
            do not agree with any part of these terms, you must not use our services.
          </p>
        </div>
      </div>

      {/* 2. Eligibility */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Membership Eligibility
          </h2>
        </div>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            To register as a member of LoveLink, you must be of legal marriageable age according to the laws of your 
            country (minimum <span className="font-semibold">18 years</span> for dating and matrimonial purposes). 
            By using this site, you represent and warrant that you have the right, authority, and legal capacity to 
            enter into this agreement and that you are not prohibited by any law from using such services.
          </p>
        </div>
      </div>

      {/* 3. Code of Conduct */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <ShieldAlert className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            User Conduct & Safety
          </h2>
        </div>
        <div className="space-y-4 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)]">
          <p>LoveLink aims to provide a secure environment. As a user, you agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Create multiple or fake profiles to mislead other members.</li>
            <li>Post offensive, defamatory, or inappropriate content/images.</li>
            <li>Harass, stalk, or abuse any member of the community.</li>
            <li>Use the platform for commercial solicitations or financial scams.</li>
          </ul>
        </div>
      </div>

      {/* 4. Content Ownership */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <FileCheck className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Content & Proprietary Rights
          </h2>
        </div>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            You are solely responsible for the content, photos, and information that you publish on LoveLink. 
            While you retain ownership of your photos, by posting them, you grant us a non-exclusive license to 
            display them on our platform to facilitate your matchmaking process. LoveLink reserves the right 
            to remove any content that violates these terms.
          </p>
        </div>
      </div>

      {/* 5. Account Termination */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Ban className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Termination of Service
          </h2>
        </div>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            LoveLink reserves the right to terminate or suspend your account without prior notice if we believe 
            you have breached these Terms & Conditions. In case of account deletion due to a violation of conduct, 
            any active premium memberships may be forfeited without a refund.
          </p>
        </div>
      </div>

      {/* 6. Disclaimer of Liability */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Disclaimer
          </h2>
        </div>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            LoveLink provides the platform "as is." While we verify profiles, we cannot guarantee the 
            authenticity of every user or the success of any relationship. We are not responsible for 
            any personal interactions that happen offline. Users are encouraged to practice safety 
            precautions when meeting anyone in person.
          </p>
          <p className="pt-2 text-[var(--fs-caption)] opacity-80 border-t border-[var(--border)] italic">
            By continuing to use our site, you acknowledge that you have read and understood these Terms. 
            LoveLink is committed to maintaining a respectful and safe community for all.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-[1200px] mx-auto py-10 border-t border-[var(--border)]">
        <h2 className="font-[var(--ff-primary)] text-[var(--fs-h3)] font-[var(--fw-bold)] text-[var(--color-primary)] uppercase tracking-tight mb-8">
          Support & Help
        </h2>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] font-[var(--ff-secondary)]">
          <p>
            If you have questions regarding these Terms, please contact our legal team: <br />
            <span className="font-[var(--fw-semibold)] uppercase text-[var(--color-primary)]">
              LoveLink Legal Dept:
            </span> <br />
            Ballabhgarh, Faridabad, Haryana - 121004 <br />
            Email:{" "}
            <a href="mailto:legal@lovelink.com" className="text-[var(--color-primary)] hover:underline">
              legal@lovelink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;