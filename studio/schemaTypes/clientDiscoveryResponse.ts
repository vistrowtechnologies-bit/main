import { defineField, defineType } from "sanity";

// Submissions from the client discovery MCQ form (/client-discovery), sent to
// a lead alongside the Stage 1 qualification reply per the Client Onboarding
// SOP - lets the team walk into the discovery call already knowing the
// business instead of starting from a blank page.
export const clientDiscoveryResponse = defineType({
  name: "clientDiscoveryResponse",
  title: "Client Discovery Response",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "company", title: "Company", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({ name: "businessType", title: "Business type", type: "string", readOnly: true }),
    defineField({ name: "businessTypeOther", title: "Business type (if Other)", type: "string", readOnly: true }),
    defineField({ name: "socialPlatforms", title: "Active social platforms", type: "array", of: [{ type: "string" }], readOnly: true }),
    defineField({ name: "socialActivity", title: "Social activity level", type: "string", readOnly: true }),
    defineField({ name: "leadSource", title: "Main lead source today", type: "string", readOnly: true }),
    defineField({ name: "crmUsage", title: "CRM usage", type: "string", readOnly: true }),
    defineField({ name: "crmName", title: "CRM name (if any)", type: "string", readOnly: true }),
    defineField({ name: "hasWebsite", title: "Website status", type: "string", readOnly: true }),
    defineField({ name: "budgetRange", title: "Monthly marketing budget", type: "string", readOnly: true }),
    defineField({ name: "teamSize", title: "Marketing/sales team size", type: "string", readOnly: true }),
    defineField({ name: "biggestChallenge", title: "Biggest challenge", type: "string", readOnly: true }),
    defineField({ name: "biggestChallengeOther", title: "Biggest challenge (if Something else)", type: "string", readOnly: true }),
    defineField({ name: "timeline", title: "How soon they want to start", type: "string", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["new", "reviewed"] },
      initialValue: "new",
    }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
  ],
  preview: {
    select: { name: "name", company: "company", status: "status", submittedAt: "submittedAt" },
    prepare({ name, company, status, submittedAt }) {
      return {
        title: `${status === "new" ? "🆕" : "✅"} ${name || "Unknown"} - ${company || "No company"}`,
        subtitle: submittedAt ? new Date(submittedAt).toLocaleString() : "",
      };
    },
  },
});
