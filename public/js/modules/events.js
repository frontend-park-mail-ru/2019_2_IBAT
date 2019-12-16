// !!!ВНИМАНИЕ!!!
// Значения событий не должны повторяться!
// Иначе вас ждёт бесконечный цикл и долгая откладка

export const ACTIONS = {
  seekerGuestSlide: 'sgs',
  employerGuestSlide: 'egs',
  guestSignInOnRespond: 'gsior',
  changeRequest: 'cr',
  startChat: 'stChat',
  goTo: 'goTo'
};

export const SEARCH = {
  search: 'initsearch',
};

export const COMPANY = {
  getPopularCompanies: 'gpc',
  getPopularCompaniesSuccess: 'gpcs',

  getCompanyInfo: 'gci',
  getCompanyInfoSuccess: 'gcis',

  search: 'scmp',
  searchSuccess: 'scmps',
};

export const AUTH = {
  checkAuth: 'checkAuth',
  checkAuthResponse: 'authR',

  signOut: 'signOut',
  signOutResponse: 'signOutR',

  signIn: 'signIn',
  signInSuccess: 'signInS',
  signInFailed: 'signInF',

  signUpSeeker: 'signUpSeeker',
  signUpEmployer: 'signUpEmployer',
  signUpSuccess: 'signUpS',
  signUpFailed: 'signUpF',

};

export const SUPPORT_CHAT = {
  ws_opened: 'wsopen',
  send: 'send',
  receive: 'receive',
};

export const CHAT = {
  getChatHistory: 'getChatHist',
  getChatHistorySuccess: 'getChatHistSuccess',
  getChatHistoryFailed: 'getChatHistFailed',
  getChats: 'getChats',
  getChatsSuccess: 'getChatsSuc',
  getChatsFailed: 'getChatsFail',
  openWs: 'openWs',
  submit: 'SUBMIT',
  openChat: 'OPEN',
  messageReceived: 'messageRe',
  messageSent: 'messageSe',
};

export const VACANCY = {
  getVacancies: 'getVacancies',
  getVacanciesSuccess: 'getVacanciesS',
  getVacanciesFailed: 'getVacanciesFailed',

  getVacanciesRecommended: 'gVR',
  getVacanciesRecommendedSuccess: 'gVRS',
  getVacanciesRecommendedFailed: 'gVRF',

  createVacancy: 'createV',
  createVacancySuccess: 'createVS',
  createVacancyFailed: 'createVF',

  getVacancy: 'getV',
  getVacancySuccess: 'getVS',
  getVacancyFailed: 'loadVF',

  chooseResume: 'chooseRes',

  search: 'searchV',
  searchSuccess: 'searchVS',
  searchFailed: 'searchVF',

  getFavorite: 'getFav',
  getFavoriteSuccess: 'getFavS',
  getFavoriteFailed: 'getFavF',

  goToVacancyPage: 'gtvp'
};

export const RESPOND = {
  respondToVacancy: 'respondToVac',
  respondToVacancySuccess: 'respondToVacS',
  respondToVacancyFailed: 'respondToVacF',

  getSeekerResponds: 'getOwnR',
  getSeekerRespondsSuccess: 'getOwnRS',
  getEmployerRespondsFailed: 'getOwnRF',
};

export const RESUME = {
  getResumes: 'getResumes',
  getResumesSuccess: 'getResumesS',
  getResumesFailed: 'getResumesF',

  getOwnResumes: 'getOwnRes',
  getOwnResumesSuccess: 'getOwnResS',
  getOwnResumesFailed: 'getOwnResF',

  createResume: 'createRes',
  createResumeSuccess: 'createResS',
  createResumeFailed: 'createResF',

  getResume: 'getRes',
  getResumeSuccess: 'getResS',
  getResumeFailed: 'getResF',

  search: 'searchR',
  searchSuccess: 'searchRS',
  searchFailed: 'searchRF',
};

export const PROFILE = {
  loadProfile: 'loadProfile',
  loadProfileSuccess: 'loadProfileS',
  loadProfileFailed: 'loadProfileF',
  saveButtonClicked: 'saveButtonC',
  saveProfile: 'saveProfile',
  saveProfileSuccess: 'saveProfileS',
  saveProfileFailed: 'saveProfileF',
  saveAvatar: 'saveAvatar',
  saveAvatarSuccess: 'saveAvatarS',
  saveAvatarFailed: 'saveAvatarF',
};
