const asyncHandler = require("express-async-handler");
const fs = require("fs");
const readline = require("readline");

const codigosPostaisFilePath = "../public/codigosPostais/todos_cp.txt";

exports.getLocalidadeByCodPostal = asyncHandler(async (req, res, next) => {
    const cod_postal = req.params.cod_postal;
    
    // Fisionomia de um Código Postal: DDCC-LLL
    const distrito = cod_postal.slice(0,2);
    const concelho = cod_postal.slice(2,4);
    const localidade = cod_postal.slice(5,8)
    
    const fileStream = fs.createReadStream(codigosPostaisFilePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const columns = line.split(";");
        if (columns[0] === distrito &&
                columns[1] === concelho &&
                    columns[2] === localidade){
            res.status(200).send(columns[3]);
            break; //localidade found
        }       
    }
    
    //No localidade was found
    res.status(404).send();
    return;
}
);
