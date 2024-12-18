if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const waypoints = [
                {
                    name: "I am here.",
                    coords: L.latLng(latitude, longitude),
                },
                {
                    name: "Sena.",
                    coords: L.latLng(4.541234597659739, -75.66826069320598),
                }
            ];

            // Customizar los iconos
            const customIcon = L.icon({
                iconUrl: 'assets/myLocation.png', // Asegúrate de que el icono esté en el directorio correcto
                iconSize: [25, 25], // Ajusta el tamaño del icono
                iconAnchor: [12, 25], // Posiciona el ancla del icono (ajustado para una imagen 25x25)
            });

            // Crear el mapa
            const map = L.map('map').setView([latitude, longitude], 13);

            // Añadir la capa de mapa
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            // Crear el control de la ruta con los waypoints
            const control = L.Routing.control({
                waypoints: waypoints.map(waypoint => waypoint.coords),
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                }),
                createMarker: function (i, waypoint, n) {
                    // Crear marcador con el ícono personalizado
                    return L.marker(waypoint.latLng, { icon: customIcon })
                        .bindPopup(waypoints[i].name); // Añadir popup con el nombre del waypoint
                },
                show: false, // El menú flotante está oculto por defecto
                addWaypoints: false, // No permite editar la ruta
            }).addTo(map);

        },
        (error) => {
            Swal.fire({
                title: 'Error!',
                text: `No se pudo obtener la ubicación: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        },
        {
            enableHighAccuracy: true, // Solicita alta precisión
            timeout: 5000, // Tiempo máximo para obtener la posición
            maximumAge: 0 // No usar posiciones en caché
        }
    );
} else {
    Swal.fire({
        title: 'Error!',
        text: 'Geolocalización no está disponible en tu navegador.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}
