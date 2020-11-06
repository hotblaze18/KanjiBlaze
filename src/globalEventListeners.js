window.addEventListener("click", function(e) {

    if (!e.target.matches('.dropdown') && !e.target.matches('.dropdownBtn')) {
        console.log("here");
        var dropdowns = document.getElementsByClassName("dropdown");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('visible')) {
            openDropdown.classList.remove('visible');
          }
        }
      }
});