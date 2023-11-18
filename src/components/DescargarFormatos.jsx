import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./../apiSelection";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  "type": "service_account",
  "project_id": "ipractica",
  "private_key_id": "a308b060f3013c19dce001be9e7a9474fe76f480",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1R/mbzxcBe/Ic\nylEWy7yVZkAi+00CGzy5meZ5BDiYwO4lqu6J+WhiyJvhy56dKJrVwjx8TA1Yqztd\nUNWJOR2e0qpCpxYxEQ6qraWMWTB2GfJkBzVw0564HhiWouOr6cvdk+l78u/Mmw2w\nX/Krl6bETjRHqargH5p9ph3lMCiDHWKs8q7h2rGgqyXOB+ezRrq7F8IsLxpHhHBc\nwwe4vxPs626WjVAclGEmvAt5fWz9zv+md/Wvq2zU34s2qDTD4OvaDF3U33kLMmtP\nyUD2rvMWjsTRIHzmXHBV2eRxM5GvT8ShWN/1qaZfRSUCumn1FLL/JDTt2VxXMo/G\nKlYbyFbVAgMBAAECggEABE/nD1SrIvb6bHP5GiFAr+eMcmYdI5mwG6NZY/h3u99j\nmZZlAFpGlJ4LJzTqINFbhiHchikA9mxf/jRpRNlHuqILmxH4kLRhyCmSMIrGlHxL\nrDb91kjDnZwJqWMHdTuRtghdm3JDKHeQ9/J1QUsMgKOGDP26NNOGs49dtSTdz19Z\nKsNIBl9GHnvlbFPt3t3t0kCKNSB8FbPAG0+Omu/1FD0AtpAVOMeUq4yMDb7YVW1D\nehDGAMYuj5KwQBr2fLRl9uhl2tWBUuIQoOMZk6J/hQ8PqG1hLZ+l0sGyB/b/UTzd\nXmFISMTSHdUcUdo6utAwVqam8SVgLgoo+HqhN9HNmQKBgQDbl8yS1YT+BnWOdV7E\nYMQPJK22/n64TTrcExmiueFJ7N3ciIxEi6iDRqFgilshz5g9AdjoDf7v4gUQlSW6\nUoIGw9XgLgCtnTEZzCgxi0QZXNCTxvqSnoBuyYDmdJ/UViT97oZnMwxguFWYsKvY\n2HxOspiuod5eeY1xzcoGt47EDwKBgQDTVhrQQzjlT6ceF8m/GHyYToEPOZNh/14G\nIT53QYv00NiwNyebrozwb44qA7PtdP5zOOE70AcxptS/cir3tK4dKRN53K/HGKmo\nI78Sz4a6rE7jFUvGXg6f9nwhnTaonlXT1WCfyOANDfZ++X4DAeRZK9ei0+YolQfv\newgJdnmC2wKBgQDbiu66tsKZ/fc2EF5I073wrekHlXU36e647Feq+1AkSq6dt98V\nANPfO5RIIstuCFDaXahwiN2jE0OhCpyHpcnd3ZlM4nFHImtesWBV+DiDauoVdNA8\nGj+pg8hdn6fT8LRXNEwnjUAIywK4/5kv2XCedax0m9zoc3pYlzgucwJHPQKBgQCJ\n+YZKAAlOVQGTeQ5jL7ZwrZg++2UIrvOQ5vVkYKviKtO9wFSgpIYpl3tmXMKEvkQ9\nr54FMdzwgq4VS5FX5WNjcGThw74TKzvgpW3i9xBMIaDjSw0Mtm2v6/nA7GY6Eh2Q\nzpdl2nzEqSAMaBDoH70YprIDAXsbdakXpehqXSoZzwKBgQCi8nMWE2c1KNpI8tp5\nBNlCtrEGoZ6zJ2N3km8pEr9N3xHRhVCEUi/UxFBZUNiBGwMCErdJCn5AY34knenY\ni2ijhFYaB5sUzbz1dJF4/Yy2F5p62qbiOcctB3mz+nb+780S8QtB9j2TbRUy2qaE\nA0Xq8JUK6Hp2AXbJFrHEGHg8aw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-5jbxr@ipractica.iam.gserviceaccount.com",
  "client_id": "113033711376671019358",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5jbxr%40ipractica.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
  "storageBucket": "ipractica.appspot.com",
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function DescargarFormatos() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]); // [file1, file2, ...
  const [downloadURLs, setDownloadURLs] = useState(null); // [url1, url2, ...

  const obtenerDownloadURLs = async () => {
    const downloadURLPromises = files.map(async (file) => {
      const fileRef = ref(storage, 'formatos/' + file);
      return await getDownloadURL(fileRef);
    });

    const urls = await Promise.all(downloadURLPromises);
    setDownloadURLs(urls);
  };
  
  useEffect(() => {
    const getFiles = async () => {
      const files = await listAll(ref(storage, 'formatos'));
      const fileNames = files.items.map((file) => file.name);
      setFiles(fileNames);
    };
    getFiles();
    obtenerDownloadURLs();
  }, []);


  return (
    <div>
      <h1>Documentación general</h1>
      <h2>Archivos</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file}</td>
              <td>
                <a href={downloadURLs[index]} download>
                  <button>Descargar</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export { DescargarFormatos };
