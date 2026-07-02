class FetchForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("focusout", this.handler);
    this.addEventListener("keydown", this.resetter);
  }

  disconnectedCallback() {
    this.removeEventListener("focusout", this.handler);
    this.removeEventListener("keydown", this.resetter);
  }

  handler(e) {
    const form = e.target.closest("form") || this.querySelector("form");
    const input = e.target.closest("input") || this.querySelector("input");
    if (!form || !input) return;
    update(form, input);
  }

  resetter(e) {
    const input = e.target.closest("input") || this.querySelector("input");
    reset(input);
  }
}

function reset(input) {
  const err = input.parentElement.querySelector(".form-error");
  if (err) err.remove();
}

async function update(form, input) {
  const url = form.action;
  const formData = new FormData(form);
  formData.append("partial", true);

  const { data, error } = await safeFetchText(url, {
    method: "POST",
    headers: {},
    body: formData,
  });

  if (error) {
    console.error(error);
  }

  if (data) {
    const formError = getFormError(input, data.data);
    insertFormErrors(input, formError);
  }
}

function getFormError(input, data) {
  const dataDoc = new DOMParser().parseFromString(data, "text/html");
  const inputBlocks = dataDoc.querySelectorAll(".input-block");

  const wantedLabel = input.parentElement.querySelector("label");
  for (var i = 0; i < inputBlocks.length; i++) {
    const currentLabel = inputBlocks.item(i).querySelector("label");

    if (wantedLabel.textContent === currentLabel.textContent)
      return currentLabel.parentElement.querySelector(".form-error");
  }
}

function insertFormErrors(input, formError) {
  if (!formError) return;
  const existingError = input.parentElement.querySelector(".form-error");

  if (existingError) {
    existingError.replaceWith = formError;
  } else {
    input.parentElement.querySelector("label").after(formError);
  }
}

async function safeFetchText(url, options) {
  let response;
  try {
    response = await fetch(url, options);
    if (!response.ok) {
      return { error: response.status, response };
    }
  } catch (error) {
    return { error: { status: 559, message: error.message } };
  }
  try {
    return { data: { data: await response.text(), response } };
  } catch (error) {
    return { error: { status: 599, message: error.message } };
  }
}

// JS availablity check
if ("querySelector" in document && "addEventListener" in window) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      customElements.define("fetch-form", FetchForm),
    );
  } else {
    customElements.define("fetch-form", FetchForm);
  }
}
