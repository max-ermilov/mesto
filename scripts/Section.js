export default class Section {
  constructor({ items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    // this._containerSelector = document.querySelector(containerSelector);
    this._containerSelector = containerSelector
  }

  clear() {
    this._containerSelector.innerHTML = '';
  }

  renderElements() {
    this.clear();

    this._items.forEach(element => {
      // console.log(element);
      this._renderer(element);
    });
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }
}
