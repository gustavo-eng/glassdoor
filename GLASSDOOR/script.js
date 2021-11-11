//const init = () => {
    const inputEmail = document.querySelector('.criarContaEmail');
    const inputPassword = document.querySelector('.entrarSenha');
    const submitButton = document.querySelector('.btn');
    var busca = document.querySelector('.principalBusca');
    const status = document.querySelector('.statusLogin');
    const caixaDeBusca = document.querySelector('.caixaDeBusca');
    const buscaEmpregoH = document.querySelector('.buscaEmprego');
    const divPai = document.querySelector('.buscaTv');
    const formLogin = document.querySelector('.SecondContainer');
    
    // Sistema de Login
    if(submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) => {
                if(response.status == 200){   
                    status.innerHTML = 'Status:Login Válido,sistema de busca logo embaixo. O formulário será apagado em alguns segundos';
                    divPai.style.display = 'block';    
                    submitButton.classList.remove('btn');
                    submitButton.classList.add('btn2');
                    setTimeout(function() {
                        formLogin.style.display = 'none';
                    }, 7000);
                    
                } 
                if(response.status != 200){
                    status.innerHTML = 'Status: Usuário ou senha invalido'
                    submitButton.classList.remove('btn');
                    submitButton.classList.add('btn3');
                }
                return response.json();
            }).then((data) => {
                localStorage.setItem("usuario", JSON.stringify(data))
                console.log(data);

            }) 
        })
    }
//Busca de dados pela API 
    function buscaDeFilmes(query){
        const url = `https://api.tvmaze.com/search/shows?q=${query}`
        fetch(url)
            .then(response => response.json())                 
            .then((jsonData) => {
                const results = jsonData.map(element => element.show.name);
                renderResults(results);
         })
        
    }

    function renderResults(results) { 
        const list = document.getElementById("resultsList");
        list.innerHTML = "";
        results.forEach(result => {
            const element = document.createElement("li");
            element.innerText = result;
            list.appendChild(element); 
        });
    }

    window.onload = () => {
        const searchFieldElement =document.getElementById("searchFields");
        searchFieldElement.onkeyup = (event) => {
            buscaDeFilmes(searchFieldElement.value);
        }
    }



//}



