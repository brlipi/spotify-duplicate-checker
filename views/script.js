var elements = document.querySelectorAll("a");

for (var i = 0; i < elements.length; i++)
{
    elements[i].addEventListener("click", function() {
        console.log(this.id)
    }, true);
}
