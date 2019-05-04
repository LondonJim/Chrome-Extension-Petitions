class MockDocument {
  constructor() {
    this.innerText = this
    this.style = this
    this.visibility
  }

  getElementById() {
    return this;
  }

  getElementsByClassName() {
    return [this]
  }

  addEventListener() {
    return this
  }
}
