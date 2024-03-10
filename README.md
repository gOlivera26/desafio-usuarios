
# Desafío Técnico: Desarrollo de una Aplicación de Gestión de Usuarios

En este desafío técnico, se te pide que desarrolles una aplicación web para gestionar usuarios. La aplicación debe permitir ver la lista de usuarios, agregar nuevos usuarios, ver detalles de cada usuario, editar usuarios existentes y eliminar usuarios. Además, la lista de usuarios debe admitir paginación y filtrado por nombre y correo electrónico.

## Requisitos Funcionales

1.  **Lista de Usuarios:**
    
    -   Mostrar una tabla paginada que lista todos los usuarios.
    -   La tabla debe incluir las columnas: Nombre, Correo electrónico, Rol y Acciones (Editar y Eliminar).
    -   Implementar paginación para la tabla de usuarios.
2.  **Agregar Usuario:**
    
    -   Implementar un formulario para agregar un nuevo usuario.
    -   El formulario debe incluir campos para Nombre, Correo electrónico, Rol y Contraseña.
    -   Validar los campos del formulario según sea necesario.
3.  **Detalles del Usuario:**
    
    -   Al hacer clic en un usuario en la lista, mostrar los detalles completos del usuario en una página separada.
4.  **Editar Usuario:**
    
    -   Implementar un formulario para editar los detalles de un usuario existente.
    -   Los campos deben estar prellenados con los detalles actuales del usuario seleccionado.
    -   Validar los campos del formulario según sea necesario.
5.  **Eliminar Usuario:**
    
    -   Implementar la funcionalidad para eliminar un usuario de la lista.
6.  **Filtrado de Usuarios:**
    
    -   Implementar un filtro de búsqueda en la lista de usuarios por Nombre y Correo electrónico.

## Requisitos Técnicos

-   Utilizar Angular para desarrollar la aplicación.
-   Estructurar la aplicación utilizando múltiples componentes para una mejor modularización y reutilización del código.
-   Utilizar enrutamiento para navegar entre las diferentes vistas de la aplicación.
-   Utilizar servicios para manejar las operaciones CRUD de los usuarios.
-   Utilizar Angular Material u otra biblioteca de UI para el diseño de la interfaz de usuario y los componentes visuales.
-   Mantener un código limpio y bien organizado, siguiendo las mejores prácticas de desarrollo Angular.

¡Buena suerte y disfruta del desafío! Si tienes alguna pregunta, no dudes en preguntar.

## Instrucciones para Ejecutar el JSON Server
- Para simular una API REST y poder realizar operaciones CRUD en la aplicación, se utiliza JSON Server. A continuacion, siga los siguientes pasos:

- 1: Abre una terminal en la raiz del proyecto.
- 2: Ejecuta el comando: json-server --watch src\assets\json-server\db.json --port 7241

# Este comando iniciará el JSON Server y lo vinculará al archivo db.json ubicado en la carpeta src/assets/json-server/, utilizando el puerto 7241.

Con esto el JSON Server, va a estar operativo para la correcta ejecucion del programa, muchas gracias!
♡( ◡‿◡ )