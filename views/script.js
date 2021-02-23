var elements = document.querySelectorAll("a");

for (var i = 0; i < elements.length; i++)
{
    elements[i].addEventListener("click", function() {
        window.location.href = `http://localhost:8888/playlists/${this.id}`;        
    }, true);
}
