document.getElementById("travelForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  console.log("Submitted Data:", data);

  const successMessage = document.getElementById("successMessage");
  successMessage.hidden = false;

  this.reset();
});
