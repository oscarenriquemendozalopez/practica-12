const readline = require("readline");

const sgb = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let disponibles = [
  "Lazarillos de Tormes",
  "El principito",
  "Don Quijote de la Mancha",
  "Inferno la Divina Comedia",
  "La Odisea",
  "Moby Dick",
];

let prestados = [];

function mostrarMenu() {
  console.log("\n--- Biblioteca Municipal ---");
  console.log("1. Ver libros disponibles");
  console.log("2. Agregar un libro");
  console.log("3. Prestar un libro");
  console.log("4. Devolver un libro");
  console.log("5. Buscar un libro");
  console.log("6. Salir");

  sgb.question("\nElige una opción de 1 a 6: ", procesarOpcion);
}

function procesarOpcion(opcion) {
  switch (opcion.trim()) {
    case "1": {
      const librosNumerados = disponibles.map(
        (libro, indice) => `${indice + 1}. ${libro}`
      );

      console.log("\nLibros disponibles:");

      if (librosNumerados.length === 0) {
        console.log("No hay libros disponibles.");
      } else {
        librosNumerados.forEach((libro) => console.log(libro));
      }

      mostrarMenu();
      break;
    }

    case "2": {
      sgb.question("\nEscribe el título del libro: ", (titulo) => {
        sgb.question(
          "¿Agregar al inicio o al final? (1 = inicio, 2 = final): ",
          (posicion) => {
            titulo = titulo.trim();

            if (titulo === "") {
              console.log("El título no puede estar vacío.");
            } else if (posicion.trim() === "1") {
              disponibles.unshift(titulo);
              console.log(`"${titulo}" se agregó al inicio.`);
            } else if (posicion.trim() === "2") {
              disponibles.push(titulo);
              console.log(`"${titulo}" se agregó al final.`);
            } else {
              console.log("Posición no válida. No se agregó el libro.");
            }

            mostrarMenu();
          }
        );
      });

      break;
    }

    case "3": {
      sgb.question("\n¿Qué libro quieres prestar? ", (titulo) => {
        const indice = disponibles.findIndex(
          (libro) => libro.toLowerCase() === titulo.trim().toLowerCase()
        );

        if (indice === -1) {
          console.log("El libro no está disponible o ya está prestado.");
        } else {
          const [libro] = disponibles.splice(indice, 1);
          prestados.push(libro);
          console.log(`Se prestó "${libro}".`);
        }

        mostrarMenu();
      });

      break;
    }

    case "4": {
      sgb.question("\n¿Qué libro quieres devolver? ", (titulo) => {
        const indice = prestados.findIndex(
          (libro) => libro.toLowerCase() === titulo.trim().toLowerCase()
        );

        if (indice === -1) {
          console.log("Ese libro no aparece entre los prestados.");
        } else {
          const [libro] = prestados.splice(indice, 1);
          disponibles.push(libro);
          console.log(`"${libro}" volvió a estar disponible.`);
        }

        mostrarMenu();
      });

      break;
    }

    case "5": {
    sgb.question("\nEscribe el título o una palabra clave: ", (busqueda) => {
        const palabra = busqueda.trim().toLowerCase();

        const encontradosDisponibles = disponibles.filter((libro) =>
          libro.toLowerCase().includes(palabra)
        );

        const encontradosPrestados = prestados.filter((libro) =>
          libro.toLowerCase().includes(palabra)
        );

        if (
          encontradosDisponibles.length === 0 &&
          encontradosPrestados.length === 0
        ) {
          console.log("No se encontraron libros.");
        } else {
          encontradosDisponibles.forEach((libro) => {
            console.log(`"${libro}": disponible`);
          });

          encontradosPrestados.forEach((libro) => {
            console.log(`"${libro}": prestado`);
          });
        }

        mostrarMenu();
      });

      break;
    }

    case "6": {
      console.log("Cerrando el sistema.");
      console.log("gracia por usar nuestro servicio próxima.")
      sgb.close();
      break;
    }

    default: {
      console.log("Opción no válida.");
      console.log("deber elegir entre 1 a 6 para usar la opciones.")
      mostrarMenu();
      break;
    }
  }
}

mostrarMenu();