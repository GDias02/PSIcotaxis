const asyncHandler = require("express-async-handler");

exports.getLocalidadeByCodPostal = asyncHandler(async (req, res, next) => {
    const fs = require("fs");
    const readline = require("readline");
    const path = require("path");
    const codigosPostaisFilePath = path.join(__dirname, "codigosPostais", "todos_cp.txt");


    const cod_postal = req.params.cod_postal;
    
    // Fisionomia de um Código Postal: DDCC-LLL
    const numeroCodPostal = cod_postal.slice(0,4);
    const extensao = cod_postal.slice(5,8)


    const fileStream = fs.createReadStream(codigosPostaisFilePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    
    for await (const line of rl) {
        const columns = line.split(";");
        if (columns[14] === numeroCodPostal &&
                columns[15] === extensao){
            res.status(200).send(columns[3]);
            return; //localidade found
        }  
    }

    //No localidade was found
    res.status(404).send();
    return;
}
);
