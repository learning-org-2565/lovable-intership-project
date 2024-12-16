// Admin Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:9001/admin/login", {
        method: "POST",
        body: new URLSearchParams({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        window.location.href = "./upload.html"; // Redirect to content upload page
    } else {
        document.getElementById("message").innerText = data.detail;
    }
});

// Upload Content
document.getElementById("uploadForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_type", document.getElementById("courseType").value);
    formData.append("module_title", document.getElementById("title").value);
    formData.append("module_content", document.getElementById("content").value);
    formData.append("image", document.getElementById("image").files[0]);

    const response = await fetch("http://localhost:9001/admin/upload-module", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    document.getElementById("message").innerText = response.ok ? data.message : data.detail;
});
