// Global data store using localStorage
export interface UserRecord {
  id: string;
  username: string;
  email: string;
  password: string;
  ip: string;
  userAgent: string;
  registeredAt: string;
  lastLogin: string;
  loginCount: number;
  country?: string;
}

export interface VisitorRecord {
  id: string;
  ip: string;
  userAgent: string;
  visitedAt: string;
  page: string;
  referrer: string;
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  isAdmin?: boolean;
}

const USERS_KEY = 'luser_ai_users';
const VISITORS_KEY = 'luser_ai_visitors';
const CHAT_KEY = 'luser_ai_chat';

export function getUsers(): UserRecord[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch { return []; }
}

export function saveUsers(users: UserRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function addUser(user: UserRecord) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function updateUser(id: string, updates: Partial<UserRecord>) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
  }
}

export function findUserByEmail(email: string): UserRecord | undefined {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserByUsername(username: string): UserRecord | undefined {
  return getUsers().find(u => u.username.toLowerCase() === username.toLowerCase());
}

export function getVisitors(): VisitorRecord[] {
  try {
    return JSON.parse(localStorage.getItem(VISITORS_KEY) || '[]');
  } catch { return []; }
}

export function addVisitor(visitor: VisitorRecord) {
  const visitors = getVisitors();
  visitors.push(visitor);
  // keep last 500
  if (visitors.length > 500) visitors.splice(0, visitors.length - 500);
  localStorage.setItem(VISITORS_KEY, JSON.stringify(visitors));
}

export function getChatMessages(): ChatMessage[] {
  try {
    return JSON.parse(localStorage.getItem(CHAT_KEY) || '[]');
  } catch { return []; }
}

export function addChatMessage(msg: ChatMessage) {
  const msgs = getChatMessages();
  msgs.push(msg);
  if (msgs.length > 200) msgs.splice(0, msgs.length - 200);
  localStorage.setItem(CHAT_KEY, JSON.stringify(msgs));
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function getCurrentUser(): UserRecord | null {
  try {
    const data = sessionStorage.getItem('luser_current_user');
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function setCurrentUser(user: UserRecord | null) {
  if (user) {
    sessionStorage.setItem('luser_current_user', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('luser_current_user');
  }
}
