const Usuario = require('../models/usuario');
const fs = require('fs');

const Curso = require('../models/curso');
const Categoria = require('../models/categoria');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'cursos':
            const curso = await Curso.findById(id);
            if (!curso) {
                console.log('No es un curso por id');
                return false;
            }

            pathViejo = `./uploads/cursos/${ curso.img }`;
            borrarImagen(pathViejo);

            curso.img = nombreArchivo;
            await curso.save();
            return true;

            break;

        case 'categorias':
            const categoria = await Categoria.findById(id);
            if (!categoria) {
                console.log('No es un categoria por id');
                return false;
            }

            pathViejo = `./uploads/categorias/${ categoria.img }`;
            borrarImagen(pathViejo);

            categoria.img = nombreArchivo;
            await categoria.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/categorias/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
    }


}



module.exports = {
    actualizarImagen
}