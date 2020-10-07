const { response } = require('express');

const Usuario = require('../models/usuario');
const Curso = require('../models/curso');
const Categoria = require('../models/categoria');


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, cursos, categorias] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Curso.find({ nombre: regex }),
        Categoria.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        cursos,
        categorias
    })

}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'cursos':
            data = await Curso.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('categoria', 'nombre img');
            break;

        case 'categorias':
            data = await Categoria.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/cursos/categorias'
            });
    }

    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}