<?php 
$nombreArchivo = "./visitantes.txt";
    function obtenerValorArchivo($nombreArchivo) {
        $contador = intval(trim(file_get_contents($nombreArchivo)));
     
        $file = fopen($nombreArchivo, "w");
        fwrite($file, $contador + 1 . PHP_EOL);
        fclose($file); // Es importante cerrar el archivo después de escribir en él
     
        $file = fopen($nombreArchivo, "r");
        $nuevo_contador = fgets($file); // Lee el contenido del archivo
        fclose($file); // Es importante cerrar el archivo después de leerlo
     
        return $nuevo_contador;
    }

    ?>