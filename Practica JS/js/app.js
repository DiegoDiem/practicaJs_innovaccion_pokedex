

const formulario = document.querySelector('#formulario');

const resultado = document.querySelector('#resultado');

window.onload=()=>{
    formulario.addEventListener('submit',validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();
    const buscador = document.querySelector('#buscador').value;

    if (buscador==='') {
        mostrarAlerta('Agrega un pokemon');
        return;
    }
    buscarPokemon();

}

function mostrarAlerta(mensaje){
    const existeAlerta = document.querySelector('.alerta');
    if(!existeAlerta){
        const alerta = document.createElement('p');
        alerta.classList.add('alerta');
    
        alerta.innerHTML=`
        <strong class="font-bold">Error!   </strong>
        <span>${mensaje}  </span>
        `;
        resultado.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

 async function buscarPokemon(){
    const buscador = document.querySelector('#buscador').value; 

    const url = `https://pokeapi.co/api/v2/pokemon/${buscador}`;
    // console.log(url);
    // fetch(url)
    //     .then(respuesta => {
    //         if (respuesta.status!="200") {
                
    //             mostrarAlerta('No existe el pokemon o está mal escrito');
    //         }else{
    //             return respuesta.json();
    //         }
    //     })
    //     .then(resultado =>{
    //         console.log(resultado);
    //         mostrarPokemon(resultado);
    //     })

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        // console.log(resultado);
        if (resultado.name) {
            mostrarPokemon(resultado);
        }else{
            mostrarAlerta('No existe el pokemon o está mal escrito');
            
        }

        
    } catch (error) {
        console.log(error);
    }

}

function mostrarPokemon(busqueda) {
    limpiarHTML();
    const {name, sprites, types, stats, moves } = busqueda;

    resultado.innerHTML+=`
            <h3>${name}</h3>
            <div class="display-grid datos"> 

                <img  src="${sprites.front_default}">
                <div class="datos_pokemon">
                    <p><strong>Tipo de pokemon: </strong> ${types[0].type.name}</p>
                    <p><strong>Estadisticas: </strong> ${stats[0].base_stat},${stats[1].base_stat},${stats[2].base_stat}, ${stats[3].base_stat}</p>
                    <p><strong>Movimientos: </strong> ${moves[0].move.name}, ${moves[1].move.name}, ${moves[2].move.name}, ${moves[3].move.name}, etc.</p>
                </div>
            </div>
        
        `
        

    

}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
