const AUTH_CONFIG = {
  salt: "QYyoa8IZbi4CoF7w5ysPdg==",
  iterations: 210000,
  verifier: "gmE53tEEnq4w7JO2l2DoGYLhLB4SehmTca2iEoH2nUs="
};

const AUTH_SESSION_KEY = "us-brand-tracker-access";
const AUTH_SESSION_VALUE = "granted-v1";

const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const authForm = document.getElementById("authForm");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");
const authMessage = document.getElementById("authMessage");
const authSubmit = document.getElementById("authSubmit");
const signOut = document.getElementById("signOut");

function decodeBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function encodeBase64(bytes) {
  let value = "";
  bytes.forEach((byte) => {
    value += String.fromCharCode(byte);
  });
  return btoa(value);
}

async function createVerifier(password) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: decodeBase64(AUTH_CONFIG.salt),
      iterations: AUTH_CONFIG.iterations
    },
    key,
    256
  );
  return encodeBase64(new Uint8Array(bits));
}

function valuesMatch(candidate, expected) {
  if (candidate.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < candidate.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

function loadScript(source) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = source;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function loadDashboard() {
  if (window.BRAND_TRACKER_DATA) return;
  await loadScript("data.js");
  await loadScript("app.js");
}

async function grantAccess() {
  sessionStorage.setItem(AUTH_SESSION_KEY, AUTH_SESSION_VALUE);
  await loadDashboard();
  authScreen.hidden = true;
  appShell.hidden = false;
  document.body.classList.add("is-authenticated");
}

function setSubmitting(isSubmitting) {
  authSubmit.disabled = isSubmitting;
  passwordInput.disabled = isSubmitting;
  passwordToggle.disabled = isSubmitting;
  authSubmit.textContent = isSubmitting ? "Checking..." : "Open dashboard";
}

passwordToggle.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";
  passwordToggle.textContent = isVisible ? "Show" : "Hide";
  passwordToggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
  passwordInput.focus();
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  authMessage.textContent = "";
  authMessage.classList.remove("is-error");

  if (!passwordInput.value) {
    authMessage.textContent = "Enter the password to continue.";
    authMessage.classList.add("is-error");
    passwordInput.focus();
    return;
  }

  if (!window.crypto?.subtle) {
    authMessage.textContent = "This browser cannot verify access. Use a current browser over HTTPS.";
    authMessage.classList.add("is-error");
    return;
  }

  setSubmitting(true);
  try {
    const candidate = await createVerifier(passwordInput.value);
    if (!valuesMatch(candidate, AUTH_CONFIG.verifier)) {
      authMessage.textContent = "That password is not correct. Try again.";
      authMessage.classList.add("is-error");
      passwordInput.select();
      return;
    }
    await grantAccess();
  } catch (error) {
    authMessage.textContent = "The dashboard could not be opened. Refresh and try again.";
    authMessage.classList.add("is-error");
  } finally {
    setSubmitting(false);
  }
});

signOut.addEventListener("click", () => {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  window.location.reload();
});

async function resumeSession() {
  if (sessionStorage.getItem(AUTH_SESSION_KEY) !== AUTH_SESSION_VALUE) {
    passwordInput.focus();
    return;
  }

  authMessage.textContent = "Restoring access...";
  setSubmitting(true);
  try {
    await grantAccess();
  } catch (error) {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    authMessage.textContent = "The dashboard could not be opened. Refresh and try again.";
    authMessage.classList.add("is-error");
    setSubmitting(false);
  }
}

resumeSession();
