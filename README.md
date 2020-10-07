-Login por roles donde los usuarios pueden actualizar su perfil de usuario siempre que estén autentificados.
Los usuarios no pueden crear, actualizar y borrar cursos.
Solo pueden listar todos los cursos y buscarlos por ID No se le permite ver a los demás usuarios.
CRUD de los cursos solo lo puede hacer el administrador.El acceso esta restringido a traves de un middleware.

-Login tradicional jsonwebtoken con encriptacion de una sola via donde escondemos la contraseña detras de :).
-Login google
-Base de datos mongoDB utilizando los métodos de mongoose para crear, leer, actualizar y borrar.
