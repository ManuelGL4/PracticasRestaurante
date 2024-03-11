<?php
//Contenido del fichero que hay que poner en el xampp
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
if (isset($_FILES['jsonBlob'])) {
    $ruta = 'http://127.0.0.1:5500/js/backup';
    $contenido = file_get_contents($_FILES['jsonBlob']['tmp_name']);
    $nombreArchivo = $ruta . date('Ymd_His') . '.json';

    file_put_contents($nombreArchivo, $contenido);

    echo json_encode("El archivo $nombreArchivo ha sido creado correctamente");
} else {
    echo json_encode('No se ha recibido ningun json.');
}