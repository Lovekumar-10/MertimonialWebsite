import React from "react";
import { Info } from "lucide-react";
import {
  Database,
  Handshake,
  FileText,
  Shield,
  BellRing,
  UserCheck,
  DatabaseBackup,
  Scale,
  CheckCircle,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="w-full pt-20 min-h-screen px-4 sm:px-6 md:px-16 lg:px-40 py-12 bg-[var(--bg-main)] font-[var(--ff-primary)]">
      <header className="text-center mb-12">
        <Shield
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
          Privacy Policy
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

      {/* Introduction Section */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Info className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Introduction
          </h2>
        </div>

        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            At{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              LoveLink
            </span>
            , we value the trust that our customers, clients, and website
            visitors place in us. Protecting your privacy and ensuring the
            security of your personal information is an important part of how we
            operate our business. This Privacy Policy explains how we collect,
            use, manage, and safeguard the limited information that may be
            shared with us through our website or during business communication.
            LoveLink is committed to maintaining transparency in how we
            handle user information. Our website is designed to provide basic
            communication and service-related support to individuals and
            businesses who wish to connect with us regarding logistics and
            transportation services. We aim to collect only the minimum
            information that is necessary to respond to user queries, provide
            assistance, and maintain professional communication with our
            customers.
          </p>
          <p>
            We understand that privacy is a significant concern in today’s
            digital environment. Therefore, LoveLink follows
            responsible data handling practices and ensures that any information
            shared with us is treated with care and confidentiality. We do not
            engage in unnecessary data collection, intrusive tracking methods,
            or the collection of sensitive personal details through our website.
            Our primary goal is to ensure that users can contact us conveniently
            while feeling secure about how their information is being handled.
          </p>

          <p>
            This Privacy Policy applies to all visitors who interact with our
            website, submit inquiries, or communicate with LoveLink
            through digital or offline channels. By accessing our website or
            providing your information to us, you acknowledge and agree to the
            practices described in this policy. LoveLink reserves the
            right to update or modify this Privacy Policy whenever necessary to
            reflect improvements in our services, legal requirements, or changes
            in operational practices. We encourage users to review this policy
            periodically to stay informed about how their information is
            protected. Our commitment is to maintain honesty, accountability,
            and respect for user privacy while delivering reliable logistics
            support and customer service.
          </p>
        </div>
      </div>

      {/* Information We Collect */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Database className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Information We Collect
          </h2>
        </div>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            At{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              LoveLink
            </span>
            , we are committed to collecting only the information that is
            necessary to provide you with the best service and support. We
            respect your privacy and want to be transparent about the data we
            handle. Our website is designed to be simple and user-friendly, and
            we collect information only when you{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              voluntarily provide it
            </span>{" "}
            to us.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold underline decoration-[var(--color-accent)] mb-1">
                Contact Information:
              </h3>
              <p>
                When you reach out via our website forms or email, we may
                collect details such as your{" "}
                <span className="font-medium italic text-[var(--color-primary)]">
                  name, phone number, and email address
                </span>
                . This allows us to respond to inquiries, provide assistance,
                and maintain communication in a professional and timely manner.
              </p>
            </div>
            <div>
              <h3 className="font-bold underline decoration-[var(--color-accent)] mb-1">
                Inquiry Details:
              </h3>
              <p>
                We collect information related to your queries, requests, or
                feedback. This helps us understand your requirements better and
                provide{" "}
                <span className="font-medium text-[var(--color-primary)]">
                  accurate and helpful responses
                </span>
                . The information collected is specific to your inquiry and is
                used solely for the purpose of resolving your request.
              </p>
            </div>
          </div>
          <p>
            We want to emphasize our commitment to{" "}
            <span className="font-bold uppercase tracking-wider text-[var(--color-primary)]">
              data minimization
            </span>{" "}
            —we only collect what is required to respond to your inquiry. We do
            not track your activity, use cookies, or gather information from
            other sources. Any personal information you provide is handled
            responsibly, stored securely, and{" "}
            <span className="font-bold text-[var(--color-primary)]">
              never sold, shared, or distributed
            </span>{" "}
            to third parties for commercial purposes.
          </p>
        </div>
      </div>

      {/* Security Section */}
      <div className="w-full max-w-[1200px] mx-auto py-10">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)]" />
          <h2 className="font-[var(--ff-primary)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Security
          </h2>
        </div>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] text-justify md:text-left">
          <p>
            At{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              LoveLink
            </span>
            , we prioritize the safety and security of the information you share
            with us. We implement appropriate measures to protect your data from
            unauthorized access, alteration, disclosure, or destruction. All
            information provided to us is handled with care and stored securely
            to ensure its{" "}
            <span className="font-bold underline decoration-[var(--color-accent)]">
              confidentiality and integrity
            </span>
            .
          </p>
          <p className="pt-2 text-[var(--fs-caption)] opacity-80 border-t border-[var(--border)] italic">
            By clearly focusing on the security of your information, we aim to
            build your trust and confidence. At LoveLink, protecting
            your data is an essential part of our commitment to transparency,
            reliability, and professionalism.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-[1200px] mx-auto py-10 border-t border-[var(--border)]">
        <h2 className="font-[var(--ff-primary)] text-[var(--fs-h3)] font-[var(--fw-bold)] text-[var(--color-primary)] uppercase tracking-tight mb-8">
          Contact Information
        </h2>
        <div className="space-y-6 text-[var(--text-primary)] leading-relaxed text-[var(--fs-body)] font-[var(--ff-secondary)]">
          <p>
            <span className="font-[var(--fw-semibold)] uppercase text-[var(--color-primary)]">
              Registered Office:
            </span> <br />
            LoveLink Global HQ <br />
            Ballabhgarh, Faridabad, Haryana - 121004 <br />
            Email:{" "}
            <a href="mailto:info@lovelink.com" className="text-[var(--color-primary)] hover:underline">
              info@lovelink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;