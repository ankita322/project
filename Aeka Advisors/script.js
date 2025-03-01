document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const uploadForm = document.getElementById("upload-form");

    // Signup logic
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            localStorage.setItem(username, password);
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        });
    }

    // Login logic
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;
            if (localStorage.getItem(username) === password) {
                sessionStorage.setItem("loggedInUser", username);
                window.location.href = "profile.html";
            } else {
                alert("Invalid username or password.");
            }
        });
    }

    // Display username in profile
    if (document.getElementById("username-display")) {
        const user = sessionStorage.getItem("loggedInUser");
        document.getElementById("username-display").textContent = user;
    }

    // Upload Image
    if (uploadForm) {
        uploadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fileInput = document.getElementById("image-upload");
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    let images = JSON.parse(localStorage.getItem("images")) || [];
                    images.push(event.target.result);
                    localStorage.setItem("images", JSON.stringify(images));
                    displayImages();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Display images in mosaic
    function displayImages() {
        const gallery = document.querySelector(".mosaic");
        if (!gallery) return;
        gallery.innerHTML = "";
        let images = JSON.parse(localStorage.getItem("images")) || [];
        images.forEach(src => {
            let img = document.createElement("img");
            img.src = src;
            gallery.appendChild(img);
        });
    }

    displayImages();
});
