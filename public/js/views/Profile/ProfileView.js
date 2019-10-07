import template from './profile.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';
const immutableFields = [
  'passwordConfirm',
  'path_to_img'
];

export class ProfileView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._eventBus.subscribeToEvent('loadProfileSuccess',
      this._onLoadProfileSuccess.bind(this));
    this._eventBus.subscribeToEvent('loadProfileFailed',
      this._onLoadProfileFailed.bind(this));

    this._eventBus.subscribeToEvent('saveAvatarFailed',
      this._onSaveAvatarFailed.bind(this));
    this._eventBus.subscribeToEvent('saveAvatarSuccess',
      this._onSaveAvatarSuccess.bind(this));
  }

  render (data = {}) {
    this._eventBus.triggerEvent('loadProfile');
  }

  _onLoadProfileSuccess (data) {
    super.render(data);
    this._role = data.role;

    this._profileForm = this._root.querySelector('.profile-form');
    this._profileForm.addEventListener('submit', this._onSaveProfile.bind(this));

    this._fileInput = this._root.querySelector('input[name="my_file"]');
    this._fileInput.addEventListener('change', this._onHandleFileSelect.bind(this), false);

    this._avatarButton = this._root.querySelector('.save-avatar');
    this._avatarButton.addEventListener('click', this._onSaveAvatar.bind(this));

    this._avatar = this._root.querySelector('.thumb');
  }

  _onLoadProfileFailed (data) {
    //
  }

  _onHandleFileSelect (event) {
    const file = event.target.files[0];
    const errMsg = this._avatar.nextElementSibling;

    const err = Validation.validateAvatar(file);
    if (err) {
      errMsg.innerHTML = err;
    } else {
      errMsg.innerHTML = '';
      let reader = new FileReader();

      this._avatar.title = file.name;

      reader.onload = function (event) {
        this._avatar.src = event.target.result;
      }.bind(this);

      reader.readAsDataURL(file);

      this._avatarButton.removeAttribute('disabled');
      this._avatarButton.classList.remove('button_disabled');
      this._avatarButton.classList.add('button_blue');
    }
  }

  _onSaveAvatar(){
    const avatar=this._fileInput.files[0] || null;
    this._eventBus.triggerEvent('saveAvatar', avatar);
  }

  _onSaveAvatarFailed (data) {
    this._avatar.nextElementSibling.innerHTML=data.error;
  }

  _onSaveAvatarSuccess (data) {
    this._avatarButton.classList.remove('button_blue');
    this._avatarButton.classList.add('button_disabled');
    this._avatarButton.setAttribute('disabled', true);
  }

  _onSaveProfile (ev) {
    ev.preventDefault();
    let wasfail = false;

    const password = this._profileForm.elements['password'];
    const passwordConfirm = this._profileForm.elements['passwordConfirm'];

    let testPass = Validation.validatePassword(password.value, true);
    if (testPass) {
      if (testPass === errInvalidPasswordData) {
        let error = password.nextElementSibling;
        error.innerHTML = 'Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре';
        error.className = 'error active';
        password.className = 'input invalid';
        passwordConfirm.className = 'input invalid';
        wasfail = true;
      }
    } else {
      let test = Validation.validateRepass(passwordConfirm.value, password.value);
      if (test === errNotEqualPassRePass) {
        let error = passwordConfirm.nextElementSibling;
        error.innerHTML = 'Пароли не совпадают';
        error.className = 'error active';
        password.className = 'input invalid';
        passwordConfirm.className = 'input invalid';
        wasfail = true;
      }
    }

    if (wasfail) {
      passwordConfirm.value = '';
      password.value = '';
    } else {
      const profile = {};
      Array.prototype.forEach.call(this._profileForm.elements, elem => {
        if (!immutableFields.includes(elem.name)) {
          profile[elem.name] = elem.value;
        }
      });
      profile['path_to_img']=this._avatar.src;
      this._eventBus.triggerEvent('saveProfile', profile, this._role);
    }
  }
}
