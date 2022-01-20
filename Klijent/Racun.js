export class Racun
{
    constructor(id, naziv_racuna, valuta, stanje, raspolozivo_stanje)
    {
        this.id = id;
        this.naziv_racuna = naziv_racuna;
        this.valuta = valuta;
        this.stanje = stanje;
        this.raspolozivo_stanje = raspolozivo_stanje;
    }
    crtaj(host)
    {  
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.naziv_racuna;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.valuta;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.stanje;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.raspolozivo_stanje;
        tr.appendChild(el);

    }
}