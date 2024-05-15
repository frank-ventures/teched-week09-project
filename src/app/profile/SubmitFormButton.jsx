"use client";
import { useFormStatus } from "react-dom";

export default function SubmitFormButton() {
  const formStatus = useFormStatus();
  return (
    <button type="submit" disabled={formStatus.pending}>
      {formStatus.pending ? "Making changes..." : "Go!"}
    </button>
  );
}
