export class Korisnik
{
    constructor(ime, prezime, id)
    {
        this.ime = ime;
        this.prezime = prezime;
        this.id = id
    }
    crtaj(host)
    {
        let red = document.createElement("div"); 
        red.className = "Pocetak";
        host.appendChild(red);
       

        let labela = document.createElement("label");
        labela.innerHTML = this.ime + " " + this.prezime;
        red.appendChild(labela);
    }
}