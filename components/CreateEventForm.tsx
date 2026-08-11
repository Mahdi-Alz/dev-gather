"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass = "bg-dark-200 rounded-[6px] px-5 py-2.5";
const textareaClass = `${inputClass} resize-none overflow-hidden`;
const fieldClass = "flex flex-col gap-2";

const autoResize = (e: React.InputEvent<HTMLTextAreaElement>) => {
  const el = e.currentTarget;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

const CreateEventForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const tags = String(formData.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const agenda = String(formData.get("agenda") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    formData.set("tags", JSON.stringify(tags));
    formData.set("agenda", JSON.stringify(agenda));

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Event creation failed");
        return;
      }

      router.push(`/event/${data.event.slug}`);
    } catch {
      setError("Event creation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className={fieldClass}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required className={inputClass} />
      </div>

      <div className={fieldClass}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={1}
          onInput={autoResize}
          className={textareaClass}
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="overview">Overview</label>
        <textarea
          id="overview"
          name="overview"
          required
          rows={1}
          onInput={autoResize}
          className={textareaClass}
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required
          className={inputClass}
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="venue">Venue</label>
        <input id="venue" name="venue" required className={inputClass} />
      </div>

      <div className={fieldClass}>
        <label htmlFor="location">Location</label>
        <input id="location" name="location" required className={inputClass} />
      </div>

      <div className={fieldClass}>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          required
          className={inputClass}
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="time">Time</label>
        <input
          id="time"
          name="time"
          type="time"
          required
          className={inputClass}
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="mode">Mode</label>
        <select id="mode" name="mode" required className={inputClass}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className={fieldClass}>
        <label htmlFor="audience">Audience</label>
        <input id="audience" name="audience" required className={inputClass} />
      </div>

      <div className={fieldClass}>
        <label htmlFor="agenda">Agenda (one item per line)</label>
        <textarea
          id="agenda"
          name="agenda"
          required
          rows={1}
          onInput={autoResize}
          className={textareaClass}
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="organizer">Organizer</label>
        <input id="organizer" name="organizer" required className={inputClass} />
      </div>

      <div className={fieldClass}>
        <label htmlFor="tags">Tags (comma separated)</label>
        <input id="tags" name="tags" required className={inputClass} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};

export default CreateEventForm;
