export default function errorHandler(error, request, response, next){
    // Check the mongodb internal errors
    if(error.code){
        if(+error.code === 11000){
            // duplication / confliction
            let message = '';
            const parts = [];
            const keys = Object.keys(error.keyValue);
            for(let key of keys){
                parts.push(`field '${key}' with the value '${error.keyValue[key]}'`);
            }
            message = `Duplicated value(s) in field(s): ${parts.join(',')}`;

            return response.status(409).json({
                success: false,
                message: message
            });
        }
    }


    // Catch any error.
    return response.status(500).json({
        success: false,
        message: error
    })    
}