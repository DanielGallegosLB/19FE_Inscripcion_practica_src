const localAPI = "http://localhost:3001";
const remoteAPI1 = "https://one9backend.onrender.com";

const APIs = [localAPI,remoteAPI1];

async function isAnswering(API) {
  try {
    console.log(`Verificando ${API}`);
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

async function findAvailableAPI() {
  const availableAPIs = [];
  
  // Intentar la API local primero si está almacenada
  if (storedAPI !== null && await isAnswering(storedAPI)) {
    console.log(`API almacenada localmente encontrada y disponible: ${storedAPI}`);
    return storedAPI;
  }

  // Intentar todas las APIs y agregar las disponibles a la lista
  for (const api of APIs) {
    if (isAnswering(api)) {
      availableAPIs.push(api);
    }
  }

  if (availableAPIs.length > 0) {
    // Seleccionar la primera API disponible
    const selectedAPI = availableAPIs[0];
    console.log(`API disponible seleccionada: ${selectedAPI}`);
    return selectedAPI;
  } else {
    console.log("No hay APIs disponibles");
    return null;
  }
}

const API = await findAvailableAPI();

export { API };

