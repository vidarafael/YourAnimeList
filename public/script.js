const buttonFavorite = document.querySelectorAll(".btn-content-favorite")
const buttonDelete = document.querySelectorAll(".btn-content-delete")

const formzim = document.querySelector(".formzim")


window.onload = () => {
  buttonFavorite.forEach(function(button, index) {
    if(localStorage.getItem(`class${button.parentElement.parentElement.id}`) != null){
      button.setAttribute("class", "btn-content-favorite " + localStorage.getItem(`class${button.parentElement.parentElement.id}`))
    }
  })
}

buttonDelete.forEach(function(button, index) {
  button.addEventListener("click", function(e) {
    console.log(document.getElementById(this.parentElement.parentElement.id))
    fetch('/' + this.parentElement.parentElement.id, {method: 'DELETE'}).then(res => {
      document.getElementById(this.parentElement.parentElement.id).remove()
      document.location.reload(true)
      localStorage.removeItem(`class${this.parentElement.parentElement.id}`, "ativo")
    })
  })
})


buttonFavorite.forEach(function(button, index) {
  button.addEventListener("click", function(e) {    
    if(this.classList[1] != undefined) {
      localStorage.removeItem(`class${this.parentElement.parentElement.id}`, "ativo")
      this.setAttribute("class", "btn-content-favorite")
    }else {
      localStorage.setItem(`class${this.parentElement.parentElement.id}`, "ativo")
      this.setAttribute("class", "btn-content-favorite " + localStorage.getItem(`class${this.parentElement.parentElement.id}`))
    }
    

    fetch('/' + this.parentElement.parentElement.id, {method: "POST"})
  })
})



