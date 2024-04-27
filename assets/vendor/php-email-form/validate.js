/**
 * PHP Email Form Validation - v3.7
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute("action");
      let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");
      /**
       * PHP Email Form Validation - v3.7
       * URL: https://bootstrapmade.com/php-email-form/
       * Author: BootstrapMade.com
       */

      const ApiURL =
        "https://script.google.com/macros/s/AKfycbzfwkUv1rmt7jaIBEjZu5D_EJS9Nj775SRld_aOk_uYQJdDyYIs76eDXKqTx2Dlv1QyfA/exec";

      (function () {
        "use strict";

        let forms = document.querySelectorAll(".php-email-form");

        forms.forEach(function (e) {
          e.addEventListener("submit", function (event) {
            event.preventDefault();

            let thisForm = this;

            let action = thisForm.getAttribute("action");
            let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");

            if (!action) {
              displayError(thisForm, "The form action property is not set!");
              return;
            }
            thisForm.querySelector(".loading").classList.add("d-block");
            thisForm
              .querySelector(".error-message")
              .classList.remove("d-block");
            thisForm.querySelector(".sent-message").classList.remove("d-block");

            let formData = new FormData(thisForm);

            if (recaptcha) {
              if (typeof grecaptcha !== "undefined") {
                grecaptcha.ready(function () {
                  try {
                    grecaptcha
                      .execute(recaptcha, { action: "php_email_form_submit" })
                      .then((token) => {
                        formData.set("recaptcha-response", token);
                        php_email_form_submit(thisForm, action, formData);
                      });
                  } catch (error) {
                    displayError(thisForm, error);
                  }
                });
              } else {
                displayError(
                  thisForm,
                  "The reCaptcha javascript API url is not loaded!"
                );
              }
            } else {
              php_email_form_submit(thisForm, action, formData);
            }
          });
        });

        function php_email_form_submit(thisForm, action, formData) {
          SendMail(thisForm)
            .then((response) => {
              if (response.message == "OK") {
                return response.message;
              } else {
                throw new Error(`Error ${response.Code} : ${response.message}`);
              }
            })
            .then((data) => {
              thisForm.querySelector(".loading").classList.remove("d-block");
              if (data.trim() == "OK") {
                thisForm
                  .querySelector(".sent-message")
                  .classList.add("d-block");
                thisForm.reset();
              } else {
                throw new Error(
                  data
                    ? data
                    : "Form submission failed and no error message returned from: " +
                      action
                );
              }
            })
            .catch((error) => {
              displayError(thisForm, error);
            });
        }

        function displayError(thisForm, error) {
          thisForm.querySelector(".loading").classList.remove("d-block");
          thisForm.querySelector(".error-message").innerHTML = error;
          thisForm.querySelector(".error-message").classList.add("d-block");
        }
      })();

      async function httpmethod() {
        await setTimeout(() => "informacion", 1500);
        return { ok: "ifnormación", message: "OK" };
      }

      async function SendMail(controls) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain;charset=utf-8");

        const raw = JSON.stringify({
          to: controls.email.value,
          name: controls.name.value,
          subject: controls.subject.value,
          body: controls.message.value,
        });

        const requestOptions = {
          redirect: "follow",
          method: "POST",
          headers: myHeaders,
          body: raw,
        };
        return fetch(ApiURL, requestOptions)
          .then((response) => response.text())
          .then((result) => JSON.parse(result))
          .catch((error) => console.log(error));
      }

      if (!action) {
        displayError(thisForm, "The form action property is not set!");
        return;
      }
      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      let formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            try {
              grecaptcha
                .execute(recaptcha, { action: "php_email_form_submit" })
                .then((token) => {
                  formData.set("recaptcha-response", token);
                  php_email_form_submit(thisForm, action, formData);
                });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(
            thisForm,
            "The reCaptcha javascript API url is not loaded!"
          );
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: "POST",
      body: formData,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(
            `${response.status} ${response.statusText} ${response.url}`
          );
        }
      })
      .then((data) => {
        thisForm.querySelector(".loading").classList.remove("d-block");
        if (data.trim() == "OK") {
          thisForm.querySelector(".sent-message").classList.add("d-block");
          thisForm.reset();
        } else {
          throw new Error(
            data
              ? data
              : "Form submission failed and no error message returned from: " +
                action
          );
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
