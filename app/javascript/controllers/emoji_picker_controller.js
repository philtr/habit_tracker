import { Controller } from "@hotwired/stimulus"
import "emoji-picker-element"

export default class extends Controller {
  static targets = ["input", "picker"]

  connect() {
    this.pickerTarget.addEventListener('emoji-click', event => {
      this.inputTarget.value = event.detail.unicode
    })
  }

  toggle() {
    this.pickerTarget.toggleAttribute('hidden')
  }
}
