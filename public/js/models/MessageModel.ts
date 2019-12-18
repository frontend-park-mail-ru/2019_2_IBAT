export default interface Message {
  chat_id: string;
  content: string;
  created_at: Date;
  owner_name?: string;
  owner_id?: string;
  is_not_yours: boolean;
}
