## Un Fork or Pull Request a este repo DESCARTA AUTOMÁTICAMENTE la postulación. Envía tu solución en tu propio repo.

# Si eres FRONTEND o FULLSTACK
El test está diseñado para entender como piensas como programador. No incluye una evaluación de tus habilidades como frontend o tu conocimiento de frameworks para el frontend. Si estás postulando como front o fullstack, sería muy bueno, **pero no obligatorio**, incluir una visualización de la data generada para los productos en la tecnología que desees.

# Introducción

Hola! Este test está basado en un refactor de código existente. Se espera que se corrija la solución para que sea escalable.

Este es el sistema de una corredora que vende seguros de auto. La plataforma actualmente se encarga de mantener actualizado el precio de sus productos basado en reglas explicadas más abajo.

## Los Productos:

- Todos los productos tienen un `sellIn` que representa la cantidad de días restantes para poder vender el producto.
- Todos los productos tienen un `price` que representa el precio del producto.
- Al final de cada día nuestro sistema actualiza ambos atributos para cada producto.

Esa es la parte simple, ahora la parte un poco más compleja:

- Cuando el producto expira (ya no hay días restantes en `sellIn`), `price` se reduce al doble de velocidad.
- El `price` del producto nunca es negativo.
- El producto **"Full Coverage"** aumenta el `price` en vez de reducirlo a medida que pasa el tiempo.
- El `price` de un producto nunca es más de 50.
- **"Mega Coverage"** es un producto legendario así que no baja de precio ni tiene expiración.
- **"Special Full Coverage"**, al igual que Full Coverage, aumenta el `price` a medida que `sellIn` llega a 0:
  - `price` aumenta en 2 cuando solo quedan 10 días o menos y por 3 cuando quedan 5 días o menos. Pero...
  - `price` baja directo a 0 cuando ya no quedan días y está expirado.

La compañía acaba de lanzar un nuevo tipo de producto, *Super Sale product*. Esto requiere una actualización a nuestro sistema:

- **"Super Sale"** Baja el `price` al doble de la velocidad de los productos normales.

Puedes hacer cualquier cambio al metodo `updatePrice`, también agregar todo el código que necesites incluyendo archivos y 
clases siempre que todo continúe funcionando correctamente. Sin embargo *NO DEBES* alterar el constructor de la clase `Product`.



## Últimas aclaraciones

- Un producto nunca puede tener su `price` por encima de 50, sin embargo **"Mega Coverage"** es un 
producto legendario y su `price` es fijo en 80, nunca cambia.

- El archivo `products_after_30_days.txt` muestra el comportamiento de los productos en un período de 30 días.
- **El producto `Super Sale` No funciona correctamente, debes implementarlo.**

## Que evaluaremos
- La solución debe ser orientada a objetos
- Debe ser escalable y fácil de mantener en el futuro.
- Mensajes de commit entendibles. Leeremos la aproximación a la solución a traves de los commits.
- Esperamos que la solución esté en Node.js (>8) o Java. Otras tecnologías son bienvenidas siempre que esté acompañado de un `Dockerfile` con todas sus dependencias incorporadas.
- Debería estar completamente testeado.
- El código debe ser limpio y fácil de entender

## Comandos requeridos
- `npm run test`, Correr los test y mostrar el coverage.
- `npm run after-30-days`, Debería calcular los precios y mostrar un resultado similar a `products_after_30_days.txt`

Puedes usar este snipet como base para correr el script `after-30-days`:

```js
const productsAtDayZero = [
  new Product('Medium Coverage', 10, 20),
  new Product('Full Coverage', 2, 0),
  new Product('Low Coverage', 5, 7),
  new Product('Mega Coverage', 0, 80),
  new Product('Mega Coverage', -1, 80),
  new Product('Special Full Coverage', 15, 20),
  new Product('Special Full Coverage', 10, 49),
  new Product('Special Full Coverage', 5, 49),
  new Product('Super Sale', 3, 6),
];

const carInsurance = new CarInsurance(productsAtDayZero);
const productPrinter = function (product) {
  console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
};

for (let i = 1; i <= 30; i += 1) {
  console.log(`Day ${i}`);
  console.log('name, sellIn, price');
  carInsurance.updatePrice().forEach(productPrinter);
  console.log('');
}
```
