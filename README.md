
# Front-End para SimpleDEX

Este proyecto consiste en un front-end interactivo que permite interactuar con un contrato de **SimpleDEX** en la blockchain. A través de esta interfaz, los usuarios pueden ejecutar diversas funciones del contrato, tales como:

- **Agregar Liquidez**
- **Retirar Liquidez**
- **Intercambiar Token A por Token B**
- **Intercambiar Token B por Token A**
- **Obtener el Precio de un Token**


## Tecnologías Utilizadas

- **React**: Librería de JavaScript para construir interfaces de usuario interactivas.
- **Scaffold-ETH**: Herramientas y hooks que permiten la interacción sencilla con contratos inteligentes en la blockchain.
- **TailwindCSS**: Framework para estilos, usado para crear una interfaz rápida y personalizable.
- **Ethers.js**: Biblioteca de JavaScript para interactuar con la blockchain.

## Funcionalidades

La interfaz permite realizar las siguientes acciones, todas ellas relacionadas con el contrato de **SimpleDEX**:

1. **Obtener el Precio de un Token**: Ingresando la dirección del token, el sistema obtiene el precio actual del token utilizando la función `getPrice` del contrato.
2. **Agregar Liquidez**: Los usuarios pueden especificar las cantidades de dos tokens (Token A y Token B) que desean agregar a la liquidez del contrato utilizando la función `addLiquidity`.
3. **Retirar Liquidez**: Permite retirar liquidez en las cantidades especificadas de Token A y Token B utilizando la función `removeLiquidity`.
4. **Intercambiar Tokens (A por B)**: Los usuarios pueden intercambiar Token A por Token B con una cantidad especificada utilizando la función `swapAforB`.
5. **Intercambiar Tokens (B por A)**: Similar a la operación anterior, pero esta vez intercambia Token B por Token A utilizando la función `swapBforA`.


## Instalación

Para ejecutar este proyecto en tu máquina local, sigue los siguientes pasos:

1. **Clonar el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <directorio-del-proyecto>
   ```

2. **Instalar las dependencias**:

   Si tienes **Yarn** instalado, ejecuta:

   ```bash
   yarn install
   ```

3. **Configurar Scaffold-ETH**:

   Asegúrate de tener configurado tu entorno de Scaffold-ETH con el contrato de **SimpleDEX**. Esto incluye la dirección del contrato y la ABI adecuada.

4. **Ejecutar el servidor de desarrollo**:

   Para iniciar el servidor local, usa el siguiente comando:

   ```bash
   yarn start
   ```

   Ahora podrás acceder a la aplicación en `http://localhost:3000`.

## Interacción con el Contrato de SimpleDEX

El front-end se conecta con el contrato **SimpleDEX** a través de los siguientes métodos:

- `getPrice(tokenAddress)`: Obtiene el precio de un token dado su dirección.
- `addLiquidity(amountA, amountB)`: Agrega liquidez al contrato con las cantidades de dos tokens.
- `removeLiquidity(amountA, amountB)`: Retira liquidez del contrato con las cantidades de dos tokens.
- `swapAforB(amountA)`: Realiza un intercambio de Token A por Token B.
- `swapBforA(amountB)`: Realiza un intercambio de Token B por Token A.
- `transferOwnership(newOwner)`: Transfiere la propiedad del contrato a una nueva dirección.
- `renounceOwnership()`: Renuncia a la propiedad del contrato.

Cada una de estas funciones está disponible en la interfaz del usuario para ser ejecutada de manera sencilla.




## Contribución

Este proyecto se encuentra en GitHub, y cualquier mejora o recomendación es bienvenida. Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama nueva (`git checkout -b feature-nueva`).
3. Haz tus cambios y confirma los mismos (`git commit -am 'Añadir nueva característica'`).
4. Empuja los cambios a tu fork (`git push origin feature-nueva`).
5. Crea un Pull Request.