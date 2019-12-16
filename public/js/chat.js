import { EventBus } from './modules/eventbus';
import { AUTH, SUPPORT_CHAT } from './modules/events';
import authModel from './models/AuthModel';
import chatModel from './models/SupportChatModel';
import { SupportChatController } from './controllers/SupportChatController';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.page');

  const globalEventBus = new EventBus([AUTH, SUPPORT_CHAT].map(model => Object.values(model)).flat());

  const models = {
    auth: authModel,
    chat: chatModel,
  };

  window.chatModel = chatModel;

  Object.values(models).forEach(model => model.setGlobalEventBus(globalEventBus));

  new SupportChatController(body, globalEventBus).start();
});
