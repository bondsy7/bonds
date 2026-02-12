"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactEmail } from "@/actions/contact";
import { Loader2, Send } from "lucide-react";

// Submit Button Component for pending state
function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg shadow-slate-300 transition hover:bg-black hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {pending ? <Loader2 className="animate-spin" /> : <Send size={18} />}
            {label}
        </button>
    );
}

export function ContactForm({ labels }: { labels: any }) {
    const [state, formAction] = useActionState(sendContactEmail, { success: false, message: "" });

    if (state.success) {
        return (
            <div className="glass-panel flex flex-col items-center justify-center rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                <p className="mt-2 text-slate-500">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="glass-panel space-y-6 rounded-3xl p-8">
            {state.message && !state.success && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                    {state.message}
                </div>
            )}

            <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">{labels.name}</label>
                <input
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                    placeholder="Your Name"
                />
            </div>
            <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">{labels.email}</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                    placeholder="hello@example.com"
                />
            </div>
            <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">{labels.message}</label>
                <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition"
                    placeholder="Let's build something..."
                />
            </div>

            <SubmitButton label={labels.send} />
        </form>
    );
}
