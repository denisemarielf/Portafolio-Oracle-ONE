const inputs = document.querySelectorAll("input, textarea");
const form = document.querySelector("form");
const submitButton = document.querySelector(".formcontact__button");

submitButton.disabled = true;

let valid = {
  nombre: false,
  email: false,
  asunto: false,
  mensaje: false,
};

function valida(input) {
  const tipoDeInput = input.name;
  if (input.validity.valid) {
    if (input.value.length > 300) {
      input.nextElementSibling.innerHTML =
        "El campo mensaje debe contener un máximo de 300 caracteres";
      valid[tipoDeInput] = false;
      checkInputsCorrectos();
    } else {
      input.nextElementSibling.innerHTML = "";
      valid[tipoDeInput] = true;
      checkInputsCorrectos();
    }
  } else {
    input.nextElementSibling.innerHTML = mostrarMensajeDeError(
      tipoDeInput,
      input
    );
    valid[tipoDeInput] = false;
    checkInputsCorrectos();
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
    patternMismatch: "El campo nombre debe contener un máximo de 50 caracteres",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  asunto: {
    valueMissing: "El campo asunto no puede estar vacío",
    patternMismatch: "El campo asunto debe contener un máximo de 50 caracteres",
  },
  mensaje: {
    valueMissing: "El campo mensaje no puede estar vacío",
  },
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}
inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});

function formularioEnviado() {
  inputs.forEach((input) => {
    input.value = "";
  });
  document.querySelector(".message-sent").innerHTML = "Formulario enviado";
}

function checkInputsCorrectos() {
  let correctos = Object.values(valid).every((value) => value === true);
  if (correctos === true) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formularioEnviado();
});
