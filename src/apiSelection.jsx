const localAPI = "http://localhost:3001";
const remoteAPI1 = "https://one9backend.onrender.com";
const remoteAPI2 = "https://19-backend.danielgallegosw.repl.co";


const APIs = [localAPI, remoteAPI1, remoteAPI2];

async function checkAPIs() {
  for (const api of APIs) {
    try {
      const response = await fetch(`${api}/ping`);
      if (response.status === 200) {
        return api; 
      }
    } catch (error) {
      console.log(`Fallo al conectar a ${api}`);
    }
  }
  return null; 
}

let API;

checkAPIs()
  .then((api) => {
    API = api;
    console.log(`API seleccionada: ${API}`);
  })
  .catch((error) => {
    console.error("Error al verificar las API:", error);
  });

export { API };
