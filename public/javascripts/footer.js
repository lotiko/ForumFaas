document.getElementById('imgLinkdIn').addEventListener('click',
function myFunctionlinkdin() {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (i = 0; i < dropdowns.length; i ++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }

    document.getElementById("myDropdownl").classList.toggle("show");
    document.getElementById("myDropdownl").addEventListener('mouseleave', function (event) {
        if (! event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    })


})
document.getElementById('imgSlack').addEventListener('click',
function myFunctionslack() {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (i = 0; i < dropdowns.length; i ++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }

    document.getElementById("myDropdowns").classList.toggle("show");
    document.getElementById("myDropdowns").addEventListener('mouseleave', function (event) {
        if (! event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    })

})
document.getElementById('imgGit').addEventListener('click',
function myFunctiongit() {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (i = 0; i < dropdowns.length; i ++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }

    document.getElementById("myDropdowng").classList.toggle("show");
    document.getElementById("myDropdowng").addEventListener('mouseleave', function (event) {
        if (! event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    })

})
document.addEventListener('click', function (event) {
    if (! event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
})