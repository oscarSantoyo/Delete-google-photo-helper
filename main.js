(function() {
  const msgPrefix = "GooglePhotosDelete helper: ";
  console.log(msgPrefix + "start");

  function getDeleteButton() {
    const deleteBtn = [...document.getElementsByTagName("button")].filter(elem => elem.getAttribute("aria-label") == "Delete").pop()
    return deleteBtn
  }

  function getMoveToBinButton() {
    const moveToBinBtn = [...document.getElementsByTagName('span')].filter(span =>
        span.innerHTML == 'Move to bin')
      .pop()
      .offsetParent
    return moveToBinBtn
  }

  function simulateClick(btn) {
    let clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("mousedown", true, true)
    btn.dispatchEvent(clickEvent);

    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("click", true, true)
    btn.dispatchEvent(clickEvent);

    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("mouseup", true, true)
    btn.dispatchEvent(clickEvent);
  }

  function doc_delete_key_up(e) {
    if (e.keyCode == 46) {
      console.log(msgPrefix + "simulating mouse click");

      const deleteBtn = getDeleteButton()
      if (deleteBtn == null) {
        console.log(msgPrefix + "ERROR: didn't find delete button");
        return null;
      }

      simulateClick(deleteBtn)
      setTimeout(() => {
        const moveToBinBtn = getMoveToBinButton()
        if (moveToBinBtn == null) {
          console.log(msgPrefix + "ERROR: didn't find delete button");
          return null;
        }
        simulateClick(moveToBinBtn)
      }, 1000)
    }
  }
  document.addEventListener('keyup', doc_delete_key_up, false);
})();
