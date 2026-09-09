# Estimador de tokens y coste

Aplicación web para simular una interacción con un modelo de chat: introduce un prompt, escribe una salida ficticia y selecciona el modelo. La aplicación muestra tokens estimados de entrada y salida, coste de cada parte y coste total.

## Cómo usarla

Abre `index.html` en cualquier navegador moderno. No hace falta instalar nada ni levantar un servidor. Escribe ambos textos y cambia el modelo o la opción de caché: los resultados se actualizan automáticamente.

## Estructura

- `index.html`: estructura de la pantalla, campos de texto, selector de modelo y resultados.
- `styles.css`: diseño responsive, tarjetas, colores y adaptación para móvil.
- `app.js`: tabla de precios, estimación de tokens, cálculo de costes y actualización de la interfaz.

## Dependencias importantes

No hay dependencias de terceros. Solo se usan HTML, CSS y JavaScript del navegador. Esto hace que el estimador funcione offline y que no se envíen los textos a ningún servicio.

## Cómo funciona el cálculo

La función `estimate` aplica una heurística local: combina número de palabras, caracteres y caracteres no ASCII para aproximar tokens. No sustituye al tokenizador real de cada modelo, porque una petición de API también puede incluir mensajes de sistema, herramientas o metadatos.

El precio se expresa por un millón de tokens. Para cada parte se usa `tokens × precio_por_millón / 1.000.000`; el total suma entrada y salida. La casilla de caché usa el precio de entrada almacenado para cada modelo.

Los importes se resaltan automáticamente: verde por debajo de `0,0000001 $` y rojo por encima de `0,000001 $`. Entre ambos límites se mantiene el color original.

El aviso sobre la precisión de la estimación se muestra en catalán dentro de la interfaz.

## Precios incluidos

Tarifas de API por 1M de tokens consultadas el 09/09/2026 en la documentación oficial de OpenAI: [pricing](https://developers.openai.com/api/docs/pricing), [GPT-5](https://developers.openai.com/api/docs/models/gpt-5), [GPT-4.1](https://developers.openai.com/api/docs/models/gpt-4.1) y [modelos GPT](https://developers.openai.com/api/docs/models/all). Si OpenAI cambia sus tarifas, actualiza el objeto `models` en `app.js`.
