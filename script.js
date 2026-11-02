https://script.google.com/home/projects/1oM5a1BIJjvD6lDYZxGvLAzAFw0xJAebe_kZTjnWoBAfscU8BkZU8l7eq/editdocument.getElementById("travelForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  console.log("Submitted Data:", data);

  const successMessage = document.getElementById("successMessage");
  successMessage.hidden = false;

  this.reset();
});
document.getElementById("travelForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch("https://script.google.com/macros/s/PASTE_YOUR_SCRIPT_ID/exec", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.text();

  if (response.ok) {
    document.getElementById("successMessage").hidden = false;
    this.reset();
    alert("Submitted successfully!");
  } else {
    alert("Submission failed: " + result);
  }
});
