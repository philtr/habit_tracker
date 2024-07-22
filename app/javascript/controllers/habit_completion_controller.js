import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "date", "dateInput"]
  static values = { date: String }

  connect() {
    // Bind the escape key event
    this.escapeHandler = this.escapeHandler.bind(this)
    document.addEventListener('keydown', this.escapeHandler)

    // Bind the click outside event
    this.clickOutsideHandler = this.clickOutsideHandler.bind(this)
    document.addEventListener('click', this.clickOutsideHandler)
  }

  disconnect() {
    // Remove event listeners when the controller is disconnected
    document.removeEventListener('keydown', this.escapeHandler)
    document.removeEventListener('click', this.clickOutsideHandler)
  }

  showModal(event) {
    event.stopPropagation()
    const dateValue = event.params.date
    console.log("showModal called, date value:", dateValue)
    this.modalTarget.classList.remove("hidden")
    if (dateValue) {
      this.dateTarget.textContent = dateValue
      this.dateInputTarget.value = dateValue
    } else {
      console.error("No date value found")
    }
  }

  hideModal() {
    this.modalTarget.classList.add("hidden")
  }

  escapeHandler(event) {
    if (event.key === "Escape") {
      this.hideModal()
    }
  }

  clickOutsideHandler(event) {
    if (!this.modalTarget.contains(event.target) && !this.modalTarget.classList.contains("hidden")) {
      this.hideModal()
    }
  }

  complete(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    fetch(event.target.action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      }
    }).then(response => response.json())
      .then(data => {
        if (data.success) {
          this.hideModal()
          // Refresh the page or update the UI as needed
          window.location.reload()
        } else {
          // Handle error
          console.error("Error completing habit:", data.error)
        }
      })
  }
}
