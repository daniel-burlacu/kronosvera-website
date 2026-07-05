import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

import type {
  SupportRequestNote,
  SupportRequestStatus,
} from "../../lib/admin-api";

type SupportNotesProps = {
  creating: boolean;
  deletingNoteId: string | null;
  editableOverride?: boolean;
  notes: SupportRequestNote[];
  onCreate: (body: string) => Promise<void>;
  onDelete: (supportRequestNoteId: string) => Promise<void>;
  onUpdate: (supportRequestNoteId: string, body: string) => Promise<void>;
  status: SupportRequestStatus;
  upsertingNoteId: string | null;
};

const formatTimestamp = (value: string): string =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const notesEditable = (status: SupportRequestStatus): boolean =>
  status === "in_progress";

function NoteComposer({
  creating,
  editable,
  onCreate,
}: {
  creating: boolean;
  editable: boolean;
  onCreate: (body: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState("");

  const submit = async (): Promise<void> => {
    const value = draft.trim();
    if (!value) {
      return;
    }
    await onCreate(value);
    setDraft("");
  };

  return (
    <Stack spacing={1.25}>
      <TextField
        disabled={!editable || creating}
        label="Add internal note"
        minRows={3}
        multiline
        onChange={(event) => setDraft(event.target.value)}
        value={draft}
      />
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography color="text.secondary" variant="caption">
          {editable
            ? "Notes can be created, edited, and deleted while the request is in progress."
            : "Notes become read-only once the request leaves In Progress."}
        </Typography>
        <Button
          disabled={!editable || creating || draft.trim().length === 0}
          onClick={() => void submit()}
          variant="contained"
        >
          {creating ? "Saving…" : "Add note"}
        </Button>
      </Stack>
    </Stack>
  );
}

function NoteItem({
  deleting,
  editable,
  note,
  onDelete,
  onUpdate,
  saving,
}: {
  deleting: boolean;
  editable: boolean;
  note: SupportRequestNote;
  onDelete: (supportRequestNoteId: string) => Promise<void>;
  onUpdate: (supportRequestNoteId: string, body: string) => Promise<void>;
  saving: boolean;
}) {
  const [draft, setDraft] = useState(note.body);
  const [editing, setEditing] = useState(false);

  const save = async (): Promise<void> => {
    const value = draft.trim();
    if (!value) {
      return;
    }
    await onUpdate(note.id, value);
    setEditing(false);
  };

  return (
    <Paper sx={{ borderRadius: 3, p: 2 }} variant="outlined">
      <Stack spacing={1}>
        <Typography fontWeight={700}>{note.author.email}</Typography>
        {editing ? (
          <TextField
            disabled={saving}
            minRows={3}
            multiline
            onChange={(event) => setDraft(event.target.value)}
            value={draft}
          />
        ) : (
          <Typography sx={{ whiteSpace: "pre-wrap" }}>{note.body}</Typography>
        )}
        <Typography color="text.secondary" variant="caption">
          {formatTimestamp(note.updatedAt)}
        </Typography>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          {editing ? (
            <>
              <Button
                disabled={saving}
                onClick={() => setEditing(false)}
                size="small"
              >
                Cancel
              </Button>
              <Button
                disabled={saving || draft.trim().length === 0}
                onClick={() => void save()}
                size="small"
                variant="contained"
              >
                {saving ? "Saving…" : "Save"}
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={!editable || deleting}
                onClick={() => setEditing(true)}
                size="small"
              >
                Edit
              </Button>
              <Button
                color="error"
                disabled={!editable || deleting}
                onClick={() => void onDelete(note.id)}
                size="small"
              >
                {deleting ? "Deleting…" : "Delete"}
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export function SupportNotes({
  creating,
  deletingNoteId,
  editableOverride,
  notes,
  onCreate,
  onDelete,
  onUpdate,
  status,
  upsertingNoteId,
}: SupportNotesProps) {
  const editable = editableOverride ?? notesEditable(status);

  return (
    <Stack spacing={1.5}>
      <Typography variant="overline">Internal notes</Typography>
      <NoteComposer
        creating={creating}
        editable={editable}
        onCreate={onCreate}
      />
      {notes.length === 0 ? (
        <Typography color="text.secondary">No internal notes yet.</Typography>
      ) : (
        <Stack spacing={1.5}>
          {notes.map((note) => (
            <NoteItem
              deleting={deletingNoteId === note.id}
              editable={editable}
              key={note.id}
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
              saving={upsertingNoteId === note.id}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
