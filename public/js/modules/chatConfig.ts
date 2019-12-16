class ChatConfigurations {
  chat_mode = undefined;

  get mode () {
    return this.chat_mode;
  }

  set mode (value) {
    this.chat_mode = value;
  }
}

export let chat_configs = new ChatConfigurations();

export const MODES = {
  chat: 'in',
  notification: 'out'
};
