import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["completionStatus"]

  toggle(event) {
    const habitId = event.target.dataset.habitId
    // Here you would typically send an AJAX request to update the habit's completion status
    // For this example, we'll just toggle a class
    this.completionStatusTarget.classList.toggle('completed')
  }
}
