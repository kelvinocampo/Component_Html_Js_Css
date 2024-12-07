if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            const waypointNames = ["You are here", "SENA"]

            // Crear el mapa
            let map = L.map('map').setView([latitude, longitude], 13);

            // Añadir la capa de mapa
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            // Añadir un marcador en la posición obtenida hasta el sena
            L.Routing.control({
                waypoints: [
                    L.latLng(latitude, longitude),
                    L.latLng(4.541234597659739, -75.66826069320598)
                ],
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                }),
                createMarker: function (i, waypoint, n) {
                    return L.marker(waypoint.latLng).bindPopup(waypointNames[i]);
                },
                show: false, // El meno flotante se encuentra oculto default
                addWaypoints: false, // No se puede editar la ruta
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