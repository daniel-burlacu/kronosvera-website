import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { useRef, useState } from "react";

import type {
  SupportRequestAttachment,
  SupportRequestDetail,
  SupportRequestNote,
  SupportRequestStatus,
  SupportRequestTranslation,
  SupportRequestTranslationField,
} from "../../lib/admin-api";
import { SupportNotes } from "./SupportNotes";
import { SupportStatusActions } from "./SupportStatusActions";

type SupportTicketDetailProps = {
  createNote: (body: string) => Promise<void>;
  deletedMode?: boolean;
  deleteNote: (supportRequestNoteId: string) => Promise<void>;
  detail: SupportRequestDetail | null;
  detailError?: string;
  deletingRequest?: boolean;
  loading: boolean;
  mutationError?: string;
  notes: SupportRequestNote[];
  pendingStatus: SupportRequestStatus | null;
  onChangeStatus: (status: SupportRequestStatus) => Promise<void>;
  onDeleteRequest?: (deleteNote?: string) => Promise<void>;
  onResolveAttachmentAccessUrl?: (attachmentId: string) => Promise<string>;
  onRestoreRequest?: () => Promise<void>;
  onTranslate: (field: SupportRequestTranslationField) => Promise<void>;
  restoringRequest?: boolean;
  translatingField?: SupportRequestTranslationField | null;
  translationError?: string;
  translations: Partial<
    Record<SupportRequestTranslationField, SupportRequestTranslation>
  >;
  updateNote: (supportRequestNoteId: string, body: string) => Promise<void>;
  upsertingNoteId: string | null;
  deletingNoteId: string | null;
};

const supportStatusLabel: Record<SupportRequestStatus, string> = {
  blocked: "Blocked",
  done: "Done",
  in_progress: "In Progress",
  todo: "Todo",
  waiting: "Waiting",
};

const isImageAttachment = (attachment: SupportRequestAttachment): boolean =>
  attachment.mimeType.startsWith("image/");

function TranslationBlock({
  field,
  onTranslate,
  text,
  translatingField,
  translation,
}: {
  field: SupportRequestTranslationField;
  onTranslate: (field: SupportRequestTranslationField) => Promise<void>;
  text: string;
  translatingField?: SupportRequestTranslationField | null;
  translation?: SupportRequestTranslation;
}) {
  return (
    <Stack spacing={1.25}>
      <Typography sx={{ whiteSpace: "pre-wrap" }}>{text}</Typography>
      <Box>
        <Button
          onClick={() => void onTranslate(field)}
          size="small"
          startIcon={<TranslateRoundedIcon />}
          variant="outlined"
        >
          {translatingField === field ? "Translating…" : "Translate to English"}
        </Button>
      </Box>
      {translation ? (
        <Paper
          sx={{
            backgroundColor: "rgba(24, 184, 79, 0.05)",
            borderRadius: 3,
            p: 2,
          }}
          variant="outlined"
        >
          <Stack spacing={0.75}>
            <Typography color="text.secondary" variant="caption">
              English translation
            </Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
              {translation.translatedText}
            </Typography>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
}

export function SupportTicketDetail({
  createNote,
  deletedMode,
  deleteNote,
  detail,
  detailError,
  deletingNoteId,
  deletingRequest,
  loading,
  mutationError,
  notes,
  onChangeStatus,
  onDeleteRequest,
  onResolveAttachmentAccessUrl,
  onRestoreRequest,
  onTranslate,
  pendingStatus,
  restoringRequest,
  translatingField,
  translationError,
  translations,
  updateNote,
  upsertingNoteId,
}: SupportTicketDetailProps) {
  const [deleteNoteDraft, setDeleteNoteDraft] = useState("");
  const [previewAttachment, setPreviewAttachment] =
    useState<SupportRequestAttachment | null>(null);
  const [previewAttachmentUrl, setPreviewAttachmentUrl] = useState("");
  const [resolvingAttachmentUrl, setResolvingAttachmentUrl] = useState(false);
  const activePreviewAttachmentIdRef = useRef<string | null>(null);

  const closePreview = () => {
    activePreviewAttachmentIdRef.current = null;
    setPreviewAttachment(null);
    setPreviewAttachmentUrl("");
    setResolvingAttachmentUrl(false);
  };

  const openPreview = async (
    attachment: SupportRequestAttachment,
  ): Promise<void> => {
    activePreviewAttachmentIdRef.current = attachment.id;
    setPreviewAttachment(attachment);
    setPreviewAttachmentUrl(attachment.downloadUrl);

    if (!onResolveAttachmentAccessUrl) {
      return;
    }

    setResolvingAttachmentUrl(true);
    try {
      const signedUrl = await onResolveAttachmentAccessUrl(attachment.id);
      if (activePreviewAttachmentIdRef.current === attachment.id) {
        setPreviewAttachmentUrl(signedUrl);
      }
    } catch {
      if (activePreviewAttachmentIdRef.current === attachment.id) {
        setPreviewAttachmentUrl(attachment.downloadUrl);
      }
    } finally {
      if (activePreviewAttachmentIdRef.current === attachment.id) {
        setResolvingAttachmentUrl(false);
      }
    }
  };

  if (loading) {
    return (
      <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
        <Typography color="text.secondary">
          Loading support request detail…
        </Typography>
      </Paper>
    );
  }

  if (detailError) {
    return <Alert severity="error">{detailError}</Alert>;
  }

  if (!detail) {
    return (
      <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
        <Typography color="text.secondary">
          Select a support request to view the full conversation.
        </Typography>
      </Paper>
    );
  }

  const isDeleted = deletedMode || Boolean(detail.deletedAt);

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          <Chip color="primary" label={supportStatusLabel[detail.status]} />
          <Chip
            label={detail.user.email ?? "Unknown user"}
            variant="outlined"
          />
          {detail.metadata?.locale ? (
            <Chip
              label={`Locale: ${detail.metadata.locale}`}
              variant="outlined"
            />
          ) : null}
          {detail.deletedAt ? (
            <Chip label={`Deleted ${detail.deletedAt}`} variant="outlined" />
          ) : null}
        </Stack>

        {translationError ? (
          <Alert severity="error">{translationError}</Alert>
        ) : null}
        {mutationError ? <Alert severity="error">{mutationError}</Alert> : null}

        {isDeleted ? (
          <Stack spacing={1.25}>
            <Typography variant="overline">Deleted state</Typography>
            <Typography color="text.secondary" variant="body2">
              {detail.deletedBy?.email
                ? `Deleted by ${detail.deletedBy.email}.`
                : "This ticket is in the deleted queue."}
              {detail.deleteNote ? ` Note: ${detail.deleteNote}` : ""}
            </Typography>
            {onRestoreRequest ? (
              <Button
                disabled={Boolean(restoringRequest)}
                onClick={() => void onRestoreRequest()}
                variant="contained"
              >
                {restoringRequest ? "Restoring…" : "Restore ticket"}
              </Button>
            ) : null}
          </Stack>
        ) : (
          <>
            <SupportStatusActions
              currentStatus={detail.status}
              onChangeStatus={onChangeStatus}
              pendingStatus={pendingStatus}
            />
            {onDeleteRequest ? (
              <Stack spacing={1.25}>
                <Typography variant="overline">Delete</Typography>
                <TextField
                  label="Delete note (optional)"
                  onChange={(event) => setDeleteNoteDraft(event.target.value)}
                  size="small"
                  value={deleteNoteDraft}
                />
                <Box>
                  <Button
                    color="error"
                    disabled={Boolean(deletingRequest)}
                    onClick={() => void onDeleteRequest(deleteNoteDraft)}
                    variant="outlined"
                  >
                    {deletingRequest ? "Deleting…" : "Move to deleted"}
                  </Button>
                </Box>
              </Stack>
            ) : null}
          </>
        )}

        <Stack spacing={1.5}>
          <Typography variant="overline">Subject</Typography>
          <TranslationBlock
            field="subject"
            onTranslate={onTranslate}
            text={detail.subject}
            translatingField={translatingField}
            translation={translations.subject}
          />
        </Stack>

        <Divider />

        <Stack spacing={1.5}>
          <Typography variant="overline">Message</Typography>
          <TranslationBlock
            field="message"
            onTranslate={onTranslate}
            text={detail.message}
            translatingField={translatingField}
            translation={translations.message}
          />
        </Stack>

        <Divider />

        <Stack spacing={1}>
          <Typography variant="overline">Attachments</Typography>
          {detail.attachments.length === 0 ? (
            <Typography color="text.secondary">
              No attachments on this request.
            </Typography>
          ) : (
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {detail.attachments.map((attachment) =>
                isImageAttachment(attachment) ? (
                  <Chip
                    clickable
                    key={attachment.id}
                    label={attachment.fileName}
                    onClick={() => void openPreview(attachment)}
                    variant="outlined"
                  />
                ) : (
                  <Link
                    href={attachment.downloadUrl}
                    key={attachment.id}
                    rel="noreferrer"
                    target="_blank"
                    underline="none"
                  >
                    <Chip
                      clickable
                      label={attachment.fileName}
                      variant="outlined"
                    />
                  </Link>
                ),
              )}
            </Stack>
          )}
        </Stack>

        <Dialog
          fullWidth
          maxWidth="lg"
          onClose={closePreview}
          open={Boolean(previewAttachment)}
        >
          <DialogContent>
            {previewAttachment ? (
              <Stack spacing={2}>
                <Typography variant="subtitle1">
                  {previewAttachment.fileName}
                </Typography>
                <Box
                  alt={previewAttachment.fileName}
                  component="img"
                  src={previewAttachmentUrl || previewAttachment.downloadUrl}
                  sx={{
                    maxHeight: "80vh",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
                <Box>
                  <Button
                    component="a"
                    href={previewAttachmentUrl || previewAttachment.downloadUrl}
                    disabled={resolvingAttachmentUrl}
                    rel="noreferrer"
                    target="_blank"
                    variant="outlined"
                  >
                    {resolvingAttachmentUrl
                      ? "Resolving secure URL…"
                      : "Open full image"}
                  </Button>
                </Box>
              </Stack>
            ) : null}
          </DialogContent>
        </Dialog>

        <Divider />

        <SupportNotes
          creating={upsertingNoteId === "new"}
          deletingNoteId={deletingNoteId}
          editableOverride={!isDeleted && detail.status === "in_progress"}
          notes={notes}
          onCreate={createNote}
          onDelete={deleteNote}
          onUpdate={updateNote}
          status={detail.status}
          upsertingNoteId={upsertingNoteId}
        />
      </Stack>
    </Paper>
  );
}
