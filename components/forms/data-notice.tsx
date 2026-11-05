// The short data notice shown beside every form's consent checkbox.
export function DataNotice() {
  return (
    <p className="mt-2 pl-7 font-sans text-[13px] leading-relaxed text-muted">
      We use these details only to reply to your request and, if you go ahead, to deliver the work. You can withdraw
      consent, or ask to see, correct or delete your data, at any time by writing to{" "}
      <a href="mailto:grievance@vistrow.com" className="text-accent-strong underline-offset-2 hover:underline">
        grievance@vistrow.com
      </a>
      . Once the Data Protection Board of India is operational, you may also complain to it. Details are in our{" "}
      <a href="/privacy-policy" className="text-accent-strong underline-offset-2 hover:underline">
        Privacy Policy
      </a>
      .
    </p>
  );
}
