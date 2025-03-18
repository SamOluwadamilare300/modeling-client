toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

document.getElementById("testButton").addEventListener("click", function() {
    toastr.success("This is a test message!");
});

document.getElementById("registrationForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const userData = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        skin_color: document.getElementById("skin_color").value,
        height: document.getElementById("height").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        gender: document.getElementById("gender").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        console.log("Server Response:", result); // Debugging line

        if (response.ok) {
            toastr.success(result.message);
            document.getElementById("registrationForm").reset(); // Clear form
        } else {
            toastr.error(result.message);
        }
    } catch (error) {
        toastr.error("An error occurred. Please try again.");
        console.error("Error:", error); // Debugging line
    }
});