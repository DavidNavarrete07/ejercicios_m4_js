function wait3(){
    return new Promise((function(TODO_OK, ALGUN_ERROR){
        setTimeout(function(){
            console.log('Información Enviada');
        }, 3000)
    }))
}

async function getAlbums() {
    const url = 'https://jsonplaceholder.typicode.com/photos';
    try {
        let albums = await fetch(url)
        albums = await albums.json();
        albums = albums.slice(0, 20);
        albums.forEach(album => {
            console.log(album.title);
        });
        wait3();
    } catch (error) {
        console.log("Hubo un error en la petición: " + error);
    }
}

getAlbums();