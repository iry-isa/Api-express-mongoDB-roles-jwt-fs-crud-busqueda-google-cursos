const { response } = require('express');

const Categoria = require('../models/categoria');


const getCategorias = async(req, res = response) => {

    const categorias = await Categoria.find()


    res.json({
        ok: true,
        categorias
    })
}


const getCategoriaById = async(req, res = response) => {

    const id = req.params.id;

    try {

        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrada por id',
            });
        }

        res.json({
            ok: true,
            categoria
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}


const crearCategoria = async(req, res = response) => {

    const uid = req.uid;
    const categoria = new Categoria({
        usuario: uid,
        ...req.body
    });

    try {

        const categoriaDB = await categoria.save();


        res.json({
            ok: true,
            categoria: categoriaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

const actualizarCategoria = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const categoria = await Categoria.findById(id, categoria, { new: true });

        if (!categoria) {
            return res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrada por id',
            });
        }

        const cambiosCategoria = {
            ...req.body,
            usuario: uid
        }

        const categoriaActualizado = await Categoria.findByIdAndUpdate(id, cambiosCategoria, { new: true });


        res.json({
            ok: true,
            categoria: categoriaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarCategoria = async(req, res = response) => {

    const id = req.params.id;

    try {

        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrado por id',
            });
        }

        await Categoria.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Categoria eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    getCategorias,
    getCategoriaById,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}