const opcionesCriptomoneda=async ()=>{
    const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
    
    const respuesta= await fetch(url);
    const resultado= await respuesta.json();
    
    console.log(resultado);
    let selectCripto=document.querySelector("#criptomoneda");
    let opcionesHTML=`<option value=""> - Selecciona - </option>`;
    
    resultado.Data.map(opcion=>{
      opcionesHTML+=`<option value="${opcion.CoinInfo.Name}">${opcion.CoinInfo.FullName}</option>`
    });
    
    selectCripto.innerHTML=opcionesHTML;
  }
  const cotizarMoneda=()=>{
    const moneda=document.querySelector("#moneda").value;
    const cripto=document.querySelector("#criptomoneda").value;
  
    if (moneda==''|| cripto==''){
      mostrarError("#msj-error","FALTA SELECCIONAR CAMPOS");
      return;
  
    }
  
  
    cotizar(moneda, cripto);
  
  }
  
  const cotizar=async(moneda="USD", cripto="BTC")=>{
  
    const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
    //console.log(url);
    const respuesta= await fetch(url);
    let resultado= await respuesta.json();
  
    //console.log(resultado.DISPLAY[cripto][moneda]);
    resultado=resultado.DISPLAY[cripto][moneda];
  
    let divResultado=document.querySelector("#divResultado");
  
  //spinner
    divResultado.innerHTML=`<div style="text-align:center">
    <img src="loading-cargando.gif" width=300 height=300>
    </div>`;
  
    setTimeout(()=>{
      divResultado.innerHTML=`
      <div class="precio"> El precio es: <span>${resultado.PRICE}</span></div>
      <div class="info"> El precio mas alto del dia: <span>${resultado.HIGHDAY}</span></div>
      <div class="info"> El precio mas bajo del dia: <span>${resultado.LOWDAY}</span></div>
      <div class="info"> variacion ultima 24 horas: <span>${resultado.CHANGEPCT24HOUR}</span></div>
      <div class="info"> ultima actualizacion: <span>${resultado.LASTUPDATE}</span></div>
      `;
    },3000);
  
  
  }
  
  const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p class="red darken-4 error">${mensaje}</p>`;
    setTimeout(()=>{ divError.innerHTML=``;}, 2000);
  }