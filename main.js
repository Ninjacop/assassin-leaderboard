function addPlayer(name) {
    let table = document.getElementById('leaderboard')
    let newRow = table.insertRow(-1)

    // Create new cells for the entry
    // name, kills
    let nameCell = newRow.insertCell(0)
    let killCell = newRow.insertCell(1)

    let xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(xhttp.response)

            for (let i = 0; i < res.length; i++) {
                if (name == res[i]["name"] && res[i]["alive"] == 1) {
                    let upperName = (res[i]["name"].charAt(0).toUpperCase() + res[i]["name"].slice(1)).split("").reverse().join("")                    
                    let finalName = (upperName.charAt(0).toUpperCase() + upperName.slice(1)).split("").reverse().join("")     

                    nameCell.innerHTML = finalName
                    killCell.innerHTML = res[i]["kills"]
                    break
                }
            }
        }
    }

    xhttp.open("GET", "https://assassin-api.herokuapp.com/players", true)
    xhttp.send()
}

window.onload = function() {
    let xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(xhttp.response)

            res.sort(function(a, b) {
                return b["kills"] - a["kills"]
            })

            for (let i = 0; i < res.length; i++) {
                addPlayer(res[i]["name"])
            }
        }
    }

    xhttp.open("GET", "https://assassin-api.herokuapp.com/players", true)
    xhttp.send()
}
  