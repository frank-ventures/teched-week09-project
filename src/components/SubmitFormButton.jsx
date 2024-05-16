"use client";
import { useFormStatus } from "react-dom";

export default function SubmitFormButton() {
  const formStatus = useFormStatus();
  return (
    <button
      className="submit-form-button"
      type="submit"
      disabled={formStatus.pending}
    >
      {formStatus.pending ? "Sending..." : "Go!"}
    </button>
  );
}
