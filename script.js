document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario");
    const confirmationMessage = document.getElementById("confirmationmessage");

    const nome = document.getElementById("nome");
    const sobrenome = document.getElementById("sobrenome");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const queryTypeRadios = document.getElementsByName("querytype");
    const consent = document.getElementById("checkbox");

    const errorNome = document.getElementById("error-name");
    const errorSobrenome = document.getElementById("error-sobrenome");
    const errorEmail = document.getElementById("error-email");
    const errorMessage = document.getElementById("error-text");
    const errorQueryType = document.getElementById("error-querytype");
    const errorConsent = document.getElementById("error-check");

    // Adiciona evento de mudança para o checkbox de consentimento
    consent.addEventListener("change", function () {
        if (consent.checked) {
            errorConsent.style.display = "none";
        }
    });

    // Adiciona evento de mudança para os radio buttons de query type
    queryTypeRadios.forEach(radio => {
        radio.addEventListener("change", function() {
            if (this.checked) {
                errorQueryType.style.display = "none";
                // Remove a classe de erro de todos os wrappers e adiciona ao selecionado
                document.querySelectorAll(".query-option-wrapper").forEach(wrapper => {
                    wrapper.classList.remove("error");
                });
                this.closest(".query-option-wrapper").classList.remove("error");
            }
        });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      // Valida nome
      if (nome.value.trim() === "") {
        nome.classList.add("error");
        errorNome.style.display = "block";
        valid = false;
      } else {
        nome.classList.remove("error");
        errorNome.style.display = "none";
      }

      // Valida sobrenome
      if (sobrenome.value.trim() === "") {
        sobrenome.classList.add("error");
        errorSobrenome.style.display = "block";
        valid = false;
      } else {
        sobrenome.classList.remove("error");
        errorSobrenome.style.display = "none";
      }

      // Valida email
      if (email.value.trim() === "" || !email.value.includes("@")) {
        email.classList.add("error");
        errorEmail.style.display = "block";
        valid = false;
      } else {
        email.classList.remove("error");
        errorEmail.style.display = "none";
      }

      // Valida mensagem
      if (message.value.trim() === "") {
        message.classList.add("error");
        errorMessage.style.display = "block";
        valid = false;
      } else {
        message.classList.remove("error");
        errorMessage.style.display = "none";
      }

      // Valida query type
      let querySelected = false;
      for (let i = 0; i < queryTypeRadios.length; i++) {
        if (queryTypeRadios[i].checked) {
          querySelected = true;
          break;
        }
      }
      if (!querySelected) {
        errorQueryType.style.display = "block";
        document.querySelectorAll(".query-option-wrapper").forEach(wrapper => {
            wrapper.classList.add("error");
        });
        valid = false;
      } else {
        errorQueryType.style.display = "none";
        document.querySelectorAll(".query-option-wrapper").forEach(wrapper => {
            wrapper.classList.remove("error");
        });
      }

      // Valida consentimento
        if (!consent.checked) {
         errorConsent.style.display = "block";
        valid = false;
        } else {
        errorConsent.style.display = "none";
    }
   

      // Se tudo estiver válido
      if (valid) {
        confirmationMessage.style.display = "flex"; // Alterado para flex para alinhar o conteúdo
        form.reset();

        // Opcional: esconder a mensagem após 5 segundos
        setTimeout(() => {
          confirmationMessage.style.display = "none";
        }, 5000);
      }
    });

    // Remover erro enquanto digita
    [nome, sobrenome, email, message].forEach(input => {
      input.addEventListener("input", function () {
        if (input.value.trim() !== "") {
          input.classList.remove("error");
          const errorDiv = document.getElementById("error-" + input.id);
          if (errorDiv) errorDiv.style.display = "none";
        }
      });
    });
  });
