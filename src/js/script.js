$('document').ready(function() {
    var idord, liv,
        bokstaver = [],
        riktige = 0,
        str, cnfrm, keys;
    const randomProperty = function(obj) {
        keys = Object.keys(obj);
        return obj[keys[keys.length * Math.random() << 0]];
    };

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function showSnackbar() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
    }
    const words = {
        dyr: ['katt', 'hund', 'kamel', 'esel', 'hest', 'ku', 'sau'],
        programmering: ['javascript', 'python', 'css', 'html', 'jquery'],
        land: ['norge', 'sverige', 'danmark', 'england', 'usa', 'russland'],
        mat: ['eple', 'pai', 'pizza', 'kjeks', 'taco', 'pasta'],
        ukedager: ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag']
    };
    //console.log(randomProperty(words))
    const wrd = randomProperty(words);
    //console.log(wrd);
    const category = getKeyByValue(words, wrd);
    //console.log(`Kategori: ${category}`);
    const word = wrd[Math.floor(Math.random() * wrd.length)];
    //console.log(word);
    const wordArr = word.split("");
    //console.log(wordArr);
    liv = 11;
    $('#liv').html(`Liv: <b>${liv}</b>`)
    var counts = {};
    wordArr.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });
    //console.log(counts);
    for (const wordz of wordArr) {
        $('#word').append(`<wordbox class="${wordz}"></wordbox>`);
    }
    $('#kategori').html(`Kategori: <b>${category}</b>`);
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const alphabetUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for (const lphbt of alphabet) {
        $(`#${lphbt}`).click(function() {
            //console.log($(this).attr('id').toUpperCase());
            guess(lphbt);
        });
    }

    function guess(id) {
        if (bokstaver.includes(id)) {
            //alert('du har allerede gjettet denne bokstaven');
            showSnackbar();
        } else {
            idord = $(`#${id}`).attr('id').toUpperCase();
            console.log(idord);
            /*for (const wrdz of wordArr) {
                if (id == wrdz) {
                    console.log('rett');
                    $(`.${id}`).text(idord);
                } else {
                    console.log('feil');
                    liv -= 1;
                    console.log(`${liv} Liv igjen`);
                }
                break;
            }*/
            if (wordArr.includes(id)) {
                console.log('rett');
                $(`.${id}`).text(`${idord}`);
                //riktige++;
                riktige += eval(`counts.${id}`);
                console.log(riktige);
            } else {
                console.log('feil');
                liv -= 1;
                console.log(`${liv} Liv igjen`);
            }
            //sleep function
            setTimeout(function() {
                $('#liv').html(`Liv: <b>${liv}</b>`);
                bokstaver.push(id);
                //$(`#${id}`).addClass('kryss');
                $(`#${id}`).append(`<div class="kryss">×</div>`);
                if (liv <= 0) {
                    alert('Du Tapte');
                    setTimeout(function() {
                        cnfrm = confirm('Spill på nytt?');
                    }, 300)
                    setTimeout(function() {
                        if (cnfrm) {
                            location.reload()
                        } else {
                            window.close();
                        }
                    }, 300);
                    //location.reload();
                } else if (riktige >= wordArr.length) {
                    alert('Du Vant!!');
                    setTimeout(function() {
                        cnfrm = confirm('Spill på nytt?');
                    }, 300)
                    setTimeout(function() {
                        if (cnfrm) {
                            location.reload()
                        } else {
                            window.close();
                        }
                    }, 300);
                    //location.reload();
                } else {
                    return false;
                }
            }, 500)
        }
    }
    $(window).bind("keydown", function(event) {
        str = String.fromCharCode(event.which).toLowerCase();
        if (alphabet.includes(str)) {
            //eval(`guess(${str})`);
            guess(str);
        } else {
            return false;
        }
        //console.log(str);
        //guess(str);
    });
});
