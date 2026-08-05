import { ChatConversation } from "@/types/chat";

const CONVERSATIONS_KEY = "missive:conversations";
const EMAIL_KEY = "missive:userEmail";

const isBrowser = () => typeof window !== "undefined";

export function loadConversations(): ChatConversation[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CONVERSATIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveConversations(conversations: ChatConversation[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
}

export function loadUserEmail(): string {
  if (!isBrowser()) return "";
  return window.localStorage.getItem(EMAIL_KEY) || "";
}

export function saveUserEmail(email: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(EMAIL_KEY, email);
}

export const newId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export function titleFromMessage(content: string): string {
  const trimmed = content.trim().replace(/\s+/g, " ");
  if (trimmed.length <= 42) return trimmed || "New conversation";
  return trimmed.slice(0, 42).trimEnd() + "…";
}
