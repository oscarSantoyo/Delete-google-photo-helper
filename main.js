(function() {
  const msgPrefix = "Google Photos Delete Photo ShortCut: ";
  console.log(msgPrefix + "start");

  const a = [...document.getElementsByTagName("button")];
  const button = a.filter(elem => elem.getAttribute("aria-label") == "Delete").pop()
  console.log(button)

  if (button == null) {
    console.log(msgPrefix + "ERROR: didn't find delete button");
    return null;
  }

  function clickMoveToBin() {
    const spans = [...document.getElementsByTagName('span')]
    const moveToBinBtn = spans.filter(span =>
       span.innerHTML == 'Move to bin')
      .pop()
      .offsetParent
    simulateClick(moveToBinBtn)
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
      simulateClick(button)
      setTimeout(clickMoveToBin, 1000)
    }
  }
  document.addEventListener('keyup', doc_delete_key_up, false);
})();
