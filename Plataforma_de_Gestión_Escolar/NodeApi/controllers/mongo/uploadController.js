
const uploaderController = (request, response)=>{
    try {
        if (!request.file) {
            return response.status(422).json({msg: 'No se pudo subir el archivo'});
        }
        response.status(200).json({msg: 'Archivo subido correctamente', file: request.file})
    } catch (error) {
        response.status(500).json({msg: 'Error al subir el archivo'});
    }
}
export {uploaderController}