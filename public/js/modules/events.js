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

export const VACANCY = {
  getVacancies: 'getVacancies',
  getVacanciesSuccess: 'getVacanciesS',
  getVacanciesFailed: 'getVacanciesFailed',

  createVacancy: 'createV',
  createVacancySuccess: 'createVS',
  createVacancyFailed: 'createVF',

  getVacancy: 'getV',
  getVacancySuccess: 'getVS',
  getVacancyFailed: 'loadVF',
  respondToVacancy: 'respondToV',

  search: 'search',
  searchSuccess: 'searchS',
  searchFailed: 'searchF',

  getFavorite: 'getFav',
  getFavoriteSuccess: 'getFavS',
  getFavoriteFailed: 'getFavF',
};

export const RESUME = {
  getResumes: 'getResumes',
  getResumesSuccess: 'getResumesS',
  getResumesFailed: 'getResumesFailed',

  createResume: 'createRes',
  createResumeSuccess: 'createResS',
  createResumeFailed: 'createResF',

  getResume: 'getRes',
  getResumeSuccess: 'getResS',
  getResumeFailed: 'getResF'
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
