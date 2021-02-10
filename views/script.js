var elements = document.querySelectorAll("a");

for (var i = 0; i < elements.length; i++)
{
    elements[i].addEventListener("click", function() {
        console.log(this.id);

        fetch(`/playlists/${this.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('test');
    }, true);
}
