"use client";

import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useActionState, useEffect, type ReactNode } from "react";
import { buttonVariants } from "@/stc-ui/button";
import { Field, Input, Select, Textarea, describedBy } from "@/stc-ui/form";
import { cn } from "@/lib/utils";
import { doubtForm, doubtTopics } from "../content/contact";
import { submitDoubt } from "./actions";
import { limits, type DoubtField, type DoubtState } from "./validate";

const initialState: DoubtState = { status: "idle" };
const fieldOrder: DoubtField[] = ["name", "email", "topic", "message"];

function Banner({ tone, children }: { tone: "success" | "error"; children: ReactNode }) {
  const Icon = tone === "success" ? CircleCheck : CircleAlert;
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-stc border px-4 py-3 text-sm",
        tone === "success" ? "border-success bg-success-tint text-success" : "border-danger bg-danger-tint text-danger",
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-4 flex-none" />
      {children}
    </p>
  );
}

/**
 * The doubt form: a normal <form> that posts to a server action, and shows the result in place.
 * (How it behaves with JavaScript switched off has not been tested.) Validation runs on the server;
 * `noValidate` stops the browser's own bubbles so every visitor sees the same accessible messages.
 */
export function DoubtForm() {
  const [state, formAction, pending] = useActionState(submitDoubt, initialState);
  const errors = state.errors ?? {};
  const values = state.values;
  const { fields } = doubtForm;

  // After a failed submit, move focus to the first field that needs fixing.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = fieldOrder.find((field) => state.errors?.[field]);
    if (first) document.getElementById(`doubt-${first}`)?.focus();
  }, [state]);

  const invalid = (field: DoubtField) => (errors[field] ? true : undefined);

  return (
    <form action={formAction} noValidate className="grid gap-5">
      {state.status === "success" ? <Banner tone="success">{state.message ?? doubtForm.messages.success}</Banner> : null}
      {state.status === "error" && state.message ? <Banner tone="error">{state.message}</Banner> : null}

      <Field id="doubt-name" label={fields.name.label} required error={errors.name}>
        <Input
          id="doubt-name"
          name="name"
          required
          autoComplete="name"
          maxLength={limits.nameMax}
          defaultValue={values?.name}
          aria-invalid={invalid("name")}
          aria-describedby={describedBy("doubt-name", { error: errors.name })}
        />
      </Field>

      <Field id="doubt-email" label={fields.email.label} hint={fields.email.hint} required error={errors.email}>
        <Input
          id="doubt-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={limits.emailMax}
          defaultValue={values?.email}
          aria-invalid={invalid("email")}
          aria-describedby={describedBy("doubt-email", { hint: fields.email.hint, error: errors.email })}
        />
      </Field>

      <Field id="doubt-topic" label={fields.topic.label} required error={errors.topic}>
        {/* The key makes React rebuild the <select> when the saved choice changes: after a failed submit React refills
            text boxes from defaultValue on its own, but not a <select>, so the visitor's topic would be lost. */}
        <Select
          key={values?.topic ?? "none"}
          id="doubt-topic"
          name="topic"
          required
          defaultValue={values?.topic ?? ""}
          aria-invalid={invalid("topic")}
          aria-describedby={describedBy("doubt-topic", { error: errors.topic })}
        >
          <option value="" disabled>
            {fields.topic.placeholder}
          </option>
          {doubtTopics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field id="doubt-message" label={fields.message.label} hint={fields.message.hint} required error={errors.message}>
        <Textarea
          id="doubt-message"
          name="message"
          required
          rows={6}
          maxLength={limits.messageMax}
          defaultValue={values?.message}
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("doubt-message", { hint: fields.message.hint, error: errors.message })}
        />
      </Field>

      {/* Honeypot: invisible and unreachable for people; bots tend to fill it. See actions.ts. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company (leave empty)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-3">
        <button
          type="submit"
          disabled={pending}
          className={cn(buttonVariants(), "w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:justify-self-start")}
        >
          {pending ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
          ) : (
            <Send aria-hidden className="size-4" />
          )}
          {pending ? doubtForm.sending : doubtForm.submit}
        </button>
        <p className="text-sm text-muted">{doubtForm.privacy}</p>
      </div>
    </form>
  );
}
