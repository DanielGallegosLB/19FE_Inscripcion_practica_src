const localAPI = "http://localhost:3001";
const remoteAPI1 = "https://one9backend.onrender.com";
const remoteAPI2 = "https://19-backend.danielgallegosw.repl.co";

const APIs = [localAPI, remoteAPI1, remoteAPI2];

async function checkAPIs() {
  for (const api of APIs) {
    try {
      console.log(`Conectando a ${api}`)
      const response = await fetch(`${api}/ping`);
      if (response.status === 200) {
        return api;
      }
    } catch (error) {
      console.log(`Fallo al conectar a ${api}`);
      continue;
    }
  }
  return null;
}

async function isAnswering(API) {
  try {
    console.log(`Verificando ${API}`)
    const response = await fetch(`${API}/ping`);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(`Fallo al conectar a ${API}`);
    return false;
  }
}

// Obtener la API almacenada localmente, si existe
const storedAPI = localStorage.getItem("selectedAPI");

// Si hay una API almacenada, úsala; además, realiza la verificación
let API;
if (storedAPI !== null) {
  await isAnswering(storedAPI) 
  
  API = storedAPI;
  console.log(`storedAPI: ${storedAPI}`);
  console.log(`API: ${API}`);
  console.log(`API almacenada localmente: ${API}`);
} else {
  if (await isAnswering(localAPI)) {
    API = localAPI;
    console.log(`API (local) encontrada: ${API}`);
  } else if (await isAnswering(remoteAPI1)) {
    API = remoteAPI1;
    console.log(`API (remota 1) seleccionada: ${API}`);
  } else if (await isAnswering(remoteAPI2)) {
    API = remoteAPI2;
    console.log(`API (remota 2) seleccionada: ${API}`);
  } else {
    console.log("No hay APIs disponibles");
  }
}




  


export { API };
