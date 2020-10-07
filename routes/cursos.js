/*
    Cursos
    ruta: '/api/cursos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCursos,
    crearCurso,
    actualizarCurso,
    borrarCurso,
    getCursoById
} = require('../controllers/cursos')


const router = Router();

router.get('/', validarJWT, getCursos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del curso es necesario').not().isEmpty(),
        check('categoria', 'El categoria id debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearCurso
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del curso es necesario').not().isEmpty(),
        check('categoria', 'El categoria id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarCurso
);

router.delete('/:id',
    validarJWT,
    borrarCurso
);

router.get('/:id',
    validarJWT,
    getCursoById
);



module.exports = router;