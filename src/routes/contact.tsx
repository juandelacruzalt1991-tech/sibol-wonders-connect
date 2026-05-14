import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Facebook, Instagram, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sibol Wonders" },
      { name: "description", content: "Reach out to Sibol Wonders. We're here to listen and support you." },
      { property: "og:title", content: "Contact Sibol Wonders" },
      { property: "og:description", content: "Get in touch with our community." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(5, "A short message helps us reply").max(2000),
});

function ContactPage() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const map: Partial<Record<keyof typeof values, string>> = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as keyof typeof values;
        map[k] = i.message;
      });
      setErrors(map);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-20 grid md:grid-cols-2 gap-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Reach out</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">We're here to listen.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you're a parent with questions, a caregiver looking for support, or a friend wanting to help — write
          to us. We read every message with care.
        </p>

        <div className="mt-8 space-y-3 text-sm">
          <a href="mailto:hello@sibolwonders.org" className="inline-flex items-center gap-2 text-foreground hover:text-primary">
            <Mail className="w-4 h-4" /> hello@sibolwonders.org
          </a>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <a href="https://facebook.com" aria-label="Facebook" className="w-11 h-11 grid place-items-center rounded-full bg-card border border-border hover:bg-secondary">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="w-11 h-11 grid place-items-center rounded-full bg-card border border-border hover:bg-secondary">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <form onSubmit={submit} className="card-soft p-6 md:p-8 space-y-4">
        {sent ? (
          <div className="text-center py-10">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h2 className="mt-4 text-2xl font-display font-bold">Thank you, {values.name}.</h2>
            <p className="mt-2 text-muted-foreground">We'll get back to you within a few days.</p>
          </div>
        ) : (
          <>
            <Field
              label="Your name"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={(v) => setValues((s) => ({ ...s, name: v }))}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={(v) => setValues((s) => ({ ...s, email: v }))}
            />
            <div>
              <label htmlFor="message" className="text-sm font-semibold">Message</label>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
                className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Tell us how we can help…"
                maxLength={2000}
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">
              Send message <Send className="w-4 h-4" />
            </button>
          </>
        )}
      </form>
    </div>
  );
}

function Field({
  label, name, value, error, onChange, type = "text",
}: { label: string; name: string; value: string; error?: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        maxLength={255}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
