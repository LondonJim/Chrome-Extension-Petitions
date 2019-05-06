class MockChrome {

  constructor() {
    this.runtime = this
    this.onMessage = this
    this.tabs = this
  }

  addListener() {
    return this;
  }

  sendMessage(id, hash) {
    return this;
  }

  query(hash, runfunction) {
    hash
    runfunction()
    return this
  }

  update() {
    return this
  }
}
