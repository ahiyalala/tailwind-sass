import Cookie from "js-cookie";

class CookieGenerator {
  constructor() {
    this.homeOwnerButton = ".js-cookie-homeowner";
    this.installerButton = ".js-cookie-installer";
  }

  delagateEventListener(event, elementSelector, func) {
    document.addEventListener(
      event,
      function(e) {
        // loop parent nodes from the target to the delegation node
        for (
          var target = e.target;
          target && target != this;
          target = target.parentNode
        ) {
          if (target.matches(elementSelector)) {
            func(target, e);
            break;
          }
        }
      },
      false
    );
  }

  start() {
    this.delagateEventListener("click", this.homeOwnerButton, (target, e) => {
      e.preventDefault();
      Cookie.set("visitorType", "homeowner", { expires: 365 });
      window.location.reload();
    });

    this.delagateEventListener("click", this.installerButton, (target, e) => {
      e.preventDefault();
      Cookie.set("visitorType", "installer", { expires: 365 });
      window.location.reload();
    });
  }
}

const startCookieGeneration = () => {
  const cookieGenerator = new CookieGenerator();
  cookieGenerator.start();
};

if (document.readyState != "loading") {
  startCookieGeneration();
} else {
  document.addEventListener("DOMContentLoaded", startCookieGeneration);
}
