export class Kartica
{
    constructor(brojkartice, tip, aktivna, osnovadodatana, datum)
    {
        this.brojkartice = brojkartice;
        this.tip = tip;
        this.osnovadodatana = osnovadodatana;
        this.aktivna=aktivna;
        this.datum = datum;
    }
    crtaj(host)
    {  
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.brojkartice;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.tip;
        tr.appendChild(el);
         
        el = document.createElement("td");
        if(this.aktivna == true)
        {
        el.innerHTML= "Aktivna";
        }
        else if(this.aktivna == false)
        {
            el.innerHTML = "Pasivna";
        };
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=this.osnovadodatana;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.datum;
        tr.appendChild(el);

    }
}