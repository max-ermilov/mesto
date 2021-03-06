export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderElements() {
    this.clear();

    this._items.forEach((element) => {
      this._renderer(element);
    });
  }

  addItemPrepend(item) {
    this._container.prepend(item);
  }

  addItemAppend(item) {
    this._container.append(item);
  }
}
