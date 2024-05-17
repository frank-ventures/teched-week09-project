"use client";
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import "./radixtoast.css";

import { useFormStatus } from "react-dom";

const ToastNote = () => {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const formStatus = useFormStatus();

  return (
    <Toast.Provider swipeDirection="right">
      <button
        className="submit-form-button"
        type="submit"
        disabled={formStatus.pending}
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway();
            setOpen(true);
          }, 100);
        }}
      >
        {formStatus.pending ? "Sending..." : "Go!"}
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">
          Post sent into the void...
        </Toast.Title>
        <Toast.Description asChild>
          <time
            className="ToastDescription"
            dateTime={eventDateRef.current.toISOString()}
          >
            {prettyDate(eventDateRef.current)}
          </time>
        </Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          {/* <button className="Button small green">Undo</button> */}
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

function oneWeekAway(date) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(date);
}

export default ToastNote;
