export const DateExtension = {
    name: 'Date',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'ext_date' || trace.payload.name === 'ext_date',
    render: ({ trace, element }) => {
      const formContainer = document.createElement('form')
  
      // Get current date and time
      let currentDate = new Date()
      let minDate = new Date()
      minDate.setMonth(currentDate.getMonth() - 1)
      let maxDate = new Date()
      maxDate.setMonth(currentDate.getMonth() + 2)
  
      // Convert to ISO string and remove seconds and milliseconds
      let minDateString = minDate.toISOString().slice(0, 16)
      let maxDateString = maxDate.toISOString().slice(0, 16)
  
      formContainer.innerHTML = `
            <style>
              /* Font and container styling */
              body, label {
                font-family: 'Pragmatica Extended', sans-serif;
                color: #4a4a4a; /* Charcoal */
              }
              .container {
                width: 400px;
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                color: #333;
              }
              input[type="datetime-local"] {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 10px;
                margin-bottom: 20px;
                font-family: 'Pragmatica Extended', sans-serif;
              }
              .submit {
                display: inline-block;
                background-color: #4a4a4a;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                border: none;
                margin-top: 20px;
              }
              .submit:hover {
                background-color: #333;
              }
              .popup-message {
                color: #4a4a4a;
                font-size: 16px;
                margin-top: 20px;
                display: none;
              }
            </style>
            
            <div class="container">
              <h1>Select a Date and Time</h1>
              <label for="date">Select your date/time:</label><br>
              <input type="datetime-local" id="meeting" name="meeting" min="${minDateString}" max="${maxDateString}" />
              <input type="submit" id="submit" class="submit" value="Submit" disabled>
              <div class="popup-message" id="popup-message">Thanks :)</div>
            </div>
            `
  
      const submitButton = formContainer.querySelector('#submit')
      const datetimeInput = formContainer.querySelector('#meeting')
      const popupMessage = formContainer.querySelector('#popup-message')
  
      datetimeInput.addEventListener('input', function () {
        submitButton.disabled = !this.value
      })
  
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault()
  
        const datetime = datetimeInput.value
        const [date, time] = datetime.split('T')
  
        formContainer.querySelector('.submit').remove()
  
        // Display the confirmation popup
        popupMessage.style.display = 'block'
        setTimeout(() => {
          popupMessage.style.display = 'none'
        }, 2000)
  
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: { date: date, time: time },
        })
      })
  
      element.appendChild(formContainer)
    },
  }
  