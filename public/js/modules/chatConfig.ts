class ChatConfigurations {
  private chat_mode = {};

  getMode ({chat_id}) {
    return this.chat_mode[chat_id];
  }

  setMode({chat_id, mode}){
    this.chat_mode[chat_id]=mode;
  }
}

export let chat_configs = new ChatConfigurations();

export const MODES = {
  chat: 'in',
  notification: 'out'
};
