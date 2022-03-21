export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(nameInput, jobInput, avatarInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
    this._avatar.src = avatarInput;
  }
}
