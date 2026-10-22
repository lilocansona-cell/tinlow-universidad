const imagenes = document.querySelectorAll(".Galeria img, .Galeria-Oculta img");
let indiceActual = 0;
const contadorImagenes = document.querySelector(".Contador-Imagenes");
function actualizarContador() {
    contadorImagenes.textContent = (indiceActual + 1) + " / " + imagenes.length;
}
const visor = document.querySelector(".Visor-Imagen");
const imagenAmpliada = document.querySelector(".Imagen-Ampliada");
imagenes.forEach(function(imagen, indice) {
    imagen.addEventListener("click", function() {
        indiceActual = indice;
        imagenAmpliada.src = imagen.src;
        visor.style.display = "flex";
        actualizarContador ();
    });
});
const cerrarVisor = document.querySelector(".Cerrar-Visor");

cerrarVisor.addEventListener("click", function() {
    visor.style.display = "none";
});
visor.addEventListener("click", function(evento) {

    if (evento.target === visor) {
        visor.style.display = "none";
    }

    if (evento.target === imagenAmpliada) {

        const rectangulo = imagenAmpliada.getBoundingClientRect();

        const anchoReal = imagenAmpliada.naturalWidth;
        const altoReal = imagenAmpliada.naturalHeight;

        const escala = Math.min(
            rectangulo.width / anchoReal,
            rectangulo.height / altoReal
        );

        const anchoVisible = anchoReal * escala;
        const altoVisible = altoReal * escala;

        const izquierda = rectangulo.left +
            (rectangulo.width - anchoVisible) / 2;

        const arriba = rectangulo.top +
            (rectangulo.height - altoVisible) / 2;

        const fueraDeImagen =
            evento.clientX < izquierda ||
            evento.clientX > izquierda + anchoVisible ||
            evento.clientY < arriba ||
            evento.clientY > arriba + altoVisible;

        if (fueraDeImagen) {
            visor.style.display = "none";
        }
    }
});
const flechaSiguiente = document.querySelector(".Flecha-Siguiente");

flechaSiguiente.addEventListener("click", function() {
    indiceActual++;

    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }

    imagenAmpliada.src = imagenes[indiceActual].src;
    actualizarContador ();
    console.log("Contador actualizado:", contadorImagenes.textContent);
});
document.addEventListener("keydown", function(evento) {

    if (visor.style.display !== "flex") {
        return;
    }

    if (evento.key === "ArrowRight") {
        indiceActual++;

        if (indiceActual >= imagenes.length) {
            indiceActual = 0;
        }

        imagenAmpliada.src = imagenes[indiceActual].src;
        actualizarContador ();
    }

    if (evento.key === "ArrowLeft") {
        indiceActual--;

        if (indiceActual < 0) {
            indiceActual = imagenes.length - 1;
        }

        imagenAmpliada.src = imagenes[indiceActual].src;
        actualizarContador ();
    }

    if (evento.key === "Escape") {
        visor.style.display = "none";
    }

});
const flechaAnterior = document.querySelector(".Flecha-Anterior");

flechaAnterior.addEventListener("click", function() {
    indiceActual--;

    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }

    imagenAmpliada.src = imagenes[indiceActual].src;
    actualizarContador ();
});
let inicioToqueX = 0;

imagenAmpliada.addEventListener("touchstart", function(evento) {
    inicioToqueX = evento.changedTouches[0].screenX;
});
imagenAmpliada.addEventListener("touchend", function(evento) {

    let finToqueX = evento.changedTouches[0].screenX;

    let distancia = inicioToqueX - finToqueX;

    if (distancia > 50) {
        flechaSiguiente.click();
    }

    if (distancia < -50) {
        flechaAnterior.click();
    }

});
function abrirGaleriaOculta(event) {
    event.preventDefault();

    // Las primeras 3 imágenes pertenecen a la galería visible.
    // La imagen de índice 3 es la primera de la galería oculta.
    indiceActual = 3;

    // Mostramos la imagen en nuestro visor original.
    imagenAmpliada.src = imagenes[indiceActual].src;

    // Abrimos el visor en pantalla completa.
    visor.style.display = "flex";

    // Actualizamos el contador.
    actualizarContador();
}