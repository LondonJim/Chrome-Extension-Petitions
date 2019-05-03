class MockChrome {
  constructor() {
    this.runtime = this
    this.onMessage = this
    this.tabs = this
  }

  addListener() {
    return this;
  }

  sendMessage() {
    return this;
  }

  query() {
    return [this]
  }

  update() {
    return this
  }
}
