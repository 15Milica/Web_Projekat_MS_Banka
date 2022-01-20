export class Transakcija
{
    constructor(sa_racuna, na_racun, iznos)
    {
        this.saRacuna = sa_racuna;
        this.naRacun = na_racun;
        this.iznos = iznos;
    }
    crtaj(host)
    {  
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.saRacuna;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.naRacun;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.iznos;
        tr.appendChild(el);
    }
}