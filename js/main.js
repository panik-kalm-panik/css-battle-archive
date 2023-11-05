const daily_table = document.getElementById("daily_list");
const battles_table = document.getElementById("battles_list");

const css_name = document.getElementById("css_name");
const holder = document.getElementById("holder");

const code_preview = document.getElementById("code_preview");
const css_preview = document.getElementById("css_preview");

var selected_css_source = "";

function load_daily_table() {
    if (daily_array.length == 0) {
        daily_table.innerHTML += `
            <p>No daily challenges uploaded yet</p>
        `
        return
    }
    for (let i = daily_array.length - 1; i >= 0; i--) {
        challenge = daily_array[i];
        daily_table.innerHTML += `
            <div onclick ="select_css('daily', ` + i + `)"><p>` + challenge.date + `</p><p>` + challenge.year + `</p></div>
        `
    }
}

function load_battles_table() {
    if (battle_array.length == 0) {
        battles_table.innerHTML += `
            <p>No battles uploaded yet</p>
        `
        return
    }
    for (challenge of battle_array) {
        battles_table.innerHTML += `
            <div onclick ="select_css('battle', ` + index + `)"><p>` + challenge.number + `</p><p>` + challenge.battle + `</p></div>
        `
    }
}

load_daily_table();
load_battles_table();

function select_css(array, index) {
    selected_css_source = array == "daily" ? daily_array[index].file : battle_array[index].file;
    selected_css_name = array == "daily" ? daily_array[index].date : battle_array[index].number;
    console.log(selected_css_source);
    fetch(selected_css_source)
        .then((res) => res.text())
        .then((text) => {
        console.log(text);
        const cleanedText = text.replace(/<script.*?>[\s\S]*?<\/script>/gi, '');
        code_preview.textContent = cleanedText;

        css_preview.setAttribute('src', selected_css_source);

        holder.style.display = 'flex';
        css_name.innerHTML = selected_css_name;
     })
}
