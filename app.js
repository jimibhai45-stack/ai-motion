const API_BASE = "https://wild-rain-7cf4.jimibhai46.workers.dev";

const $ = (id) => document.getElementById(id);

const imageMode = $("imageMode");
const promptMode = $("promptMode");
const uploadArea = $("uploadArea");
const imageInput = $("imageInput");
const browseBtn = $("browseBtn");
const uploadText = $("uploadText");
const previewBox = $("previewBox");
const previewImage = $("previewImage");
const removeImage = $("removeImage");
const promptInput = $("prompt");
const generateBtn = $("generateBtn");
const message = $("message");
const resultVideo = $("resultVideo");
const placeholder = $("placeholder");
const downloadBtn = $("downloadBtn");

let mode = "image";
let selectedImage = null;
let previewURL = null;

function showMessage(text, success = false) {
  message.textContent = text;
  message.style.color = success ? "#9cf0ca" : "#ffb8c2";
}

function setMode(nextMode) {
  mode = nextMode;

  imageMode.classList.toggle("active", mode === "image");
  promptMode.classList.toggle("active", mode === "prompt");
  uploadArea.classList.toggle("hidden", mode === "prompt");

  showMessage("");
}

imageMode.addEventListener("click", () => setMode("image"));
promptMode.addEventListener("click", () => setMode("prompt"));

browseBtn.addEventListener("click", () => imageInput.click());

uploadArea.addEventListener("click", (event) => {
  if (
    mode === "image" &&
    !event.target.closest("button") &&
    !event.target.closest("#previewBox")
  ) {
    imageInput.click();
  }
});

function loadImage(file) {
  if (!file) return;

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    showMessage("JPG, PNG ya WEBP image select karein.");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    showMessage("Image 10 MB se chhoti honi chahiye.");
    return;
  }

  if (previewURL) URL.revokeObjectURL(previewURL);

  selectedImage = file;
  previewURL = URL.createObjectURL(file);
  previewImage.src = previewURL;

  uploadText.classList.add("hidden");
  previewBox.classList.remove("hidden");

  showMessage("Image upload ho gayi!", true);
}

imageInput.addEventListener("change", (event) => {
  loadImage(event.target.files[0]);
});

removeImage.addEventListener("click", () => {
  selectedImage = null;
  imageInput.value = "";

  if (previewURL) URL.revokeObjectURL(previewURL);
  previewURL = null;

  previewImage.removeAttribute("src");
  previewBox.classList.add("hidden");
  uploadText.classList.remove("hidden");
  showMessage("");
});

["dragenter", "dragover"].forEach((name) => {
  uploadArea.addEventListener(name, (event) => {
    event.preventDefault();
    uploadArea.style.borderColor = "#9878ff";
  });
});

["dragleave", "drop"].forEach((name) => {
  uploadArea.addEventListener(name, (event) => {
    event.preventDefault();
    uploadArea.style.borderColor = "";
  });
});

uploadArea.addEventListener("drop", (event) => {
  if (mode === "image") {
    loadImage(event.dataTransfer.files[0]);
  }
});

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    showMessage("Pehle video prompt likhein.");
    promptInput.focus();
    return;
  }

  if (mode === "image" && !selectedImage) {
    showMessage("Pehle image upload karein.");
    return;
  }

  const formData = new FormData();
  formData.append("mode", mode);
  formData.append("prompt", prompt);
  formData.append("ratio", $("ratio").value);
  formData.append("duration", $("duration").value);

  if (mode === "image") {
    formData.append("image", selectedImage);
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "Connecting...";

  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed.");
    }

    if (!data.videoUrl) {
      throw new Error("Video URL nahi mila.");
    }

    resultVideo.src = data.videoUrl;
    resultVideo.hidden = false;
    placeholder.classList.add("hidden");

    downloadBtn.href = data.videoUrl;
    downloadBtn.hidden = false;

    showMessage("Video ready hai!", true);
  } catch (error) {
    showMessage(error.message || "Connection error.");
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "✦ Generate Video";
  }
});
