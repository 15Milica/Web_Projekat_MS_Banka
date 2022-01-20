import { Korisnik } from "./Korisnik.js";
import { Racun } from "./Racun.js";
import { Transakcija } from "./Transakcija.js";
import { Kartica } from "./Kartica.js";

export class Banka
{
    constructor(ime)
    {
        this.ime = ime;
        this.contejner = null;
        this.logovanje = null;
        this.aplikacija = null;
        this.nalog = null;
        this.nizRacuna = "";
    }
    crtaj(host)
    {
        let naslov = document.createElement("h1");
        naslov.innerHTML="MS Banka";
        naslov.className="Naslov";
        host.appendChild(naslov); 

        this.contejner = document.createElement("div");
        this.contejner.className="Kontejner";
        host.appendChild(this.contejner);

        this.logovanje =  document.createElement("div");
        this.logovanje.className="Logovanje";
        this.contejner.appendChild(this.logovanje);

        this.crtajLogovanje(this.logovanje);
    }
    crtajRed(host){
        let red = document.createElement("div");
        host.appendChild(red);
        return red;
    }
    crtajLogovanje(host)
    {
        let r = this.crtajRed(host);
        let text = document.createElement("h3");
        text.innerHTML="MS Banka prijava";
        text.className = "TextPrijava";
        r.appendChild(text);

        let ime = this.crtajRed(host);
        ime.className = "TextBox";
        let labela = document.createElement("label");
        labela.innerHTML="Korisnicko ime: ";
        ime.appendChild(labela);
        let unosIme = document.createElement("input");
        unosIme.type="text";
        unosIme.placeholder = "Korisnicko ime";
        ime.appendChild(unosIme);

        let sifra = this.crtajRed(host);
        sifra.className = "TextBox";
        labela = document.createElement("label");
        labela.innerHTML="Lozinka: ";
        sifra.appendChild(labela);
        let unosSifre = document.createElement("input");
        unosSifre.type="password";
        unosSifre.placeholder = "Lozinka";
        sifra.appendChild(unosSifre);

        let d = this.crtajRed(host);
        d.className = "Dugmebox";
        let dugme = document.createElement("button");
        dugme.innerHTML = "Kreiranje naloga";
        dugme.onclick=(ev)=>this.kreiranjeNaloga();
        dugme.className = "Dugme";
        d.appendChild(dugme);
        
        dugme = document.createElement("button");
        dugme.innerHTML = "Prijava";
        dugme.onclick=(ev)=>this.uloguj(unosIme.value, unosSifre.value);
        dugme.className = "Dugme";
        d.appendChild(dugme);    
    }
    kreiranjeNaloga()
    {
        this.obrisiPrethodniSadrzajNalog();

        let labela = document.createElement("h3");
        labela.innerHTML = "Kreiranje korisničkog naloga";
        labela.className = "TextPrijava";
        this.nalog.appendChild(labela);

        let d = this.crtajRed(this.nalog);
        d.className = "TextBox";
        let lab = document.createElement("label");
        lab.innerHTML = "Korisničko ime:";
        d.appendChild(lab);
        let ime = document.createElement("input");
        ime.type = "text";
        d.appendChild(ime);

        d = this.crtajRed(this.nalog);
        d.className = "TextBox";
        lab = document.createElement("label");
        lab.innerHTML = "Unesite lozinku:";
        d.appendChild(lab);
        let sifra = document.createElement("input");
        sifra.type = "password";
        d.appendChild(sifra);

        d = this.crtajRed(this.nalog);
        d.className = "TextBox";
        lab = document.createElement("label");
        lab.innerHTML = "Potvrdite lozinku:";
        d.appendChild(lab);
        let potvrda = document.createElement("input");
        potvrda.type = "password";
        d.appendChild(potvrda);
        
        
        d = this.crtajRed(this.nalog);
        d.className = "TextBox";
        lab = document.createElement("label");
        lab.innerHTML = "Unesite JMBG:";
        d.appendChild(lab);
        let jmbg = document.createElement("input");
        jmbg.type = "number";
        d.appendChild(jmbg);
        
        d = this.crtajRed(this.nalog);
        d.className = "Dugmebox";

        var dugme = document.createElement("button");
        dugme.innerHTML = "Potvrdi";
        dugme.className = "Dugme";
        dugme.onclick = (ev)=>this.kreiraj(ime.value, sifra.value, potvrda.value, jmbg.value);
        d.appendChild(dugme);

        dugme = document.createElement("button");
        dugme.innerHTML = "Odustani";
        dugme.className = "Dugme";
        dugme.onclick = (ev)=>this.odustani();
        d.appendChild(dugme);
    }
    obrisiPrethodniSadrzajNalog()
    {
        var log = document.querySelector(".Logovanje");
        var roditelj = log.parentNode;
        roditelj.removeChild(log);

        this.nalog = document.createElement("div");
        this.nalog.className = "Nalog";
        this.contejner.appendChild(this.nalog);
    }
    kreiraj(ime, sifra, potvrda, jmbg)
    {
        if(ime === null || ime === undefined || ime === "")
        {
            alert("Unesite korisnicko ime");
            return;
        }
        if(sifra === null || sifra === undefined || sifra === "" )
        {
            alert("Unesite lozinku");
            return;
        }
        if( potvrda === null || potvrda === undefined || potvrda === "")
        {
            alert("Niste potvrdili lozinku");
            return;
        }
        if(jmbg=== null || jmbg === undefined || jmbg === "")
        {
            alert("Unesite JMBG");
            return;
        }
        if(sifra != potvrda)
        {
            alert("Lozinka nije potvrdjena");
            return;
        }
        fetch("https://localhost:5001/Nalog/KreiranjeNologa/"+ime+"/"+sifra+"/"+jmbg,
        {
            method:"POST"
        }).then( s=>
            {
                if(s.status == 200)
                {
                    alert("Uspesno kreiran nalog");
                    this.odustani();
                }
                else
                {
                    if(s.status == 202)
                    alert("Korisnik ne postoji");
                    if(s.status == 203)
                    alert("Nalog sa datim korisničkim imenom ili lozinkom već postoji");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu kreiranja naloga.");
            });
        
    }
    odustani()
    {
        var nal = document.querySelector(".Nalog");
        var roditelj = nal.parentNode;
        roditelj.removeChild(nal);

        this.logovanje =  document.createElement("div");
        this.logovanje.className="Logovanje";
        this.contejner.appendChild(this.logovanje);

        this.crtajLogovanje(this.logovanje);
    }
    uloguj(ime, lozinka)
    {
        if(ime === null || ime === undefined || ime === "")
        {
            alert("Unesite korisnicko ime");
            return;
        }
        if(lozinka === null || lozinka === undefined || lozinka === "" )
        {
            alert("Unesite lozinku");
            return;
        }

        else {
        fetch("https://localhost:5001/Nalog/Prijava/"+ime+"/"+lozinka,
        {
            method:"GET"
        }).then( s=>
            {
                if(s.ok)
                {
                    this.obrisiPrethodniSadrzajAplikacija();
                    s.json().then(data=>{
                        data.forEach(s=>{
                            const korisnik = new Korisnik(s.ime, s.prezime, s.id); 
                           
                            this.crtajAplikaciju(korisnik, this.aplikacija);
                        });   
                    }) 
                }
                else
                {
                    alert("Korisnik ne postoji");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu kreiranja naloga.");
            });
        }
       
    }
    
    obrisiPrethodniSadrzajAplikacija()
    {
        var log = document.querySelector(".Logovanje");
        var roditelj = log.parentNode;
        roditelj.removeChild(log);

        this.aplikacija = document.createElement("div");
        this.aplikacija.className = "Aplikacija";
        this.contejner.appendChild(this.aplikacija);
    }
    crtajAplikaciju(korisnik, host)
    {
        korisnik.crtaj(host);

        let nav = this.crtajRed(host);
        nav.className = "Navigacija";

        let prikaz = this.crtajRed(host);
        prikaz.className = "Prikaz";

        let dugme = document.createElement("button");
        dugme.innerHTML = "RAČUNI";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.crtajRacuni(korisnik,prikaz);
        nav.appendChild(dugme);
        
      
        dugme = document.createElement("button");
        dugme.innerHTML = "KARTICE";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.crtajKartice(korisnik);
        nav.appendChild(dugme);
        
        dugme = document.createElement("button");
        dugme.innerHTML = "TRANSAKCIJA";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.crtajTransakcija(prikaz);
        nav.appendChild(dugme);
    }
    obrisiTabelu()
    {
        var prikaz = document.querySelector(".Prikaz");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        let noviprikaz = document.createElement("div");
        noviprikaz.className = "Prikaz";
        this.aplikacija.appendChild(noviprikaz);
        return noviprikaz;
    }
    crtajTabeluRacuni(host)
    {
        var tabela = document.createElement("table");
        tabela.className="tabela";
        host.appendChild(tabela);

        var tabelahead= document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);  
        
        var tabelaBody = document.createElement("tbody");
        tabelaBody.className="TabelaPodaci";
        tabela.appendChild(tabelaBody); 
        
        let th;
        var zag=["Naziv računa", "Valuta", "Stanje", "Raspoloživo stanje"];
        zag.forEach(el=>{
            th = document.createElement("th");
            th.innerHTML=el;
            tr.appendChild(th);
        }); 
    }
    crtajRacuni(korisnik, prikaz)
    {
        var novihost = this.obrisiTabelu();
        this.crtajTabeluRacuni(novihost);

        var telo = document.querySelector(".TabelaPodaci");

        fetch("https://localhost:5001/Racun/VratiRacune/"+korisnik.id,
        {
            method:"GET"
        }).then( s=>
            {
                if(s.ok)
                {
                    s.json().then(data=>{
                        data.forEach(s=>{
                            const racun = new Racun(s.id,s.naziv, s.valuta, s.stanje, s.raspolozivo_Stanje); 
                            
                            this.nizRacuna = this.nizRacuna.concat(racun.id, "a");
                            racun.crtaj(telo);
                        });
                    }) 
                }
                else
                {
                    alert("Greska");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu prikaza racuna.");
            });

        let dugme = document.createElement("button");
        dugme.innerHTML = "Otvori račun";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.crtajNoviRacun(korisnik, prikaz);
        novihost.appendChild(dugme);

        dugme = document.createElement("button");
        dugme.innerHTML = "Zatvori račun";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.obrisiRacun(korisnik, prikaz);
        novihost.appendChild(dugme);
    }
    crtajNoviRacun(korisnik, host)
    {
        var novihost = this.obrisiTabelu();
        let m = this.crtajRed(host);
        m.className="Logovanje";
        novihost.appendChild(m);

        let d = this.crtajRed(host);
        d.className="TextBox";
        let labela = document.createElement("label");
        labela.innerHTML = "Unesite broj racuna:";
        d.appendChild(labela);
        let broj_racuna = document.createElement("input");
        broj_racuna.type = "number";
        d.appendChild(broj_racuna);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        labela = document.createElement("label");
        labela.innerHTML = "Unesite stanje racuna:";
        d.appendChild(labela);
        let stanje = document.createElement("input");
        stanje.type = "number";
        d.appendChild(stanje);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        labela = document.createElement("label");
        labela.innerHTML = "Unesite raspolozivo stanje:";
        d.appendChild(labela);
        let raspolozivo = document.createElement("input");
        raspolozivo.type = "number";
        d.appendChild(raspolozivo);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        labela = document.createElement("label");
        labela.innerHTML = "Valuta:";
        d.appendChild(labela);
        let valuta = document.createElement("input");
        valuta.type = "text";
        d.appendChild(valuta);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        let dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.napraviRacun(korisnik, broj_racuna.value, stanje.value, raspolozivo.value, valuta.value);
        d.appendChild(dugme);
        m.appendChild(d);

    }
    napraviRacun(korisnik, broj_racuna, stanje, raspolozivo, valuta)
    {
        if(broj_racuna === null || broj_racuna === undefined || broj_racuna === "")
        {
            alert("Unesite broj racuna");
            return;
        }
        if(stanje === null || stanje === undefined || stanje === "" )
        {
            alert("Unesite stanje");
            return;
        }
        if(raspolozivo === null || raspolozivo === undefined || raspolozivo === "")
        {
            alert("Unesite raspolozivo stanje");
            return;
        }
        if(valuta === null || valuta === undefined || valuta === "" )
        {
            alert("Unesite valutu");
            return;
        }
        fetch("https://localhost:5001/Racun/DodajRacun/"+korisnik.id+"/"+broj_racuna+"/"+stanje+"/"+raspolozivo+"/"+valuta,
        {
            method:"POST"
        }).then( s=>
            {
                if(s.ok)
                {
                    s.json().then(data=>{
                            this.nizRacuna = this.nizRacuna.concat(data.id, "a"); 
                    });
                    this.crtajRacuni(korisnik);
                }
                else
                {
                    alert("Greska");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu prikaza racuna.");
            });
    }
    obrisiRacun(korisnik, host)
    {
        var novihost = this.obrisiTabelu();
        let m = this.crtajRed(host);
        m.className="Logovanje";
        novihost.appendChild(m);

        let d = this.crtajRed(host);
        d.className="TextBox";
        let labela = document.createElement("label");
        labela.innerHTML = "Unesite broj racuna:";
        d.appendChild(labela);
        let broj_racuna = document.createElement("input");
        broj_racuna.type = "number";
        d.appendChild(broj_racuna);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        let dugme = document.createElement("button");
        dugme.innerHTML = "Zatvori račun";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.ukoloniRacun(korisnik, broj_racuna.value);
        d.appendChild(dugme);
        m.appendChild(d);
    }
    ukoloniRacun(korisnik, broj_racuna)
    {
        if(broj_racuna === null || broj_racuna === undefined || broj_racuna === "")
        {
            alert("Unesite broj racuna");
            return;
        }
        fetch("https://localhost:5001/Racun/IzbrisiRacun/"+korisnik.id+"/"+broj_racuna,
        {
            method:"DELETE"
        }).then( s=>
            {
                if(s.ok)
                {
                    this.crtajRacuni(korisnik);
                }
                else
                {
                    alert("Greska");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu prikaza racuna.");
            });
    }

    crtajTabeluKartice(host)
    {
        var tabela = document.createElement("table");
        tabela.className="tabela";
        host.appendChild(tabela);

        var tabelahead= document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);  
        
        var tabelaBody = document.createElement("tbody");
        tabelaBody.className="TabelaPodaci";
        tabela.appendChild(tabelaBody); 
        
        let th;
        var zag=["Naziv kartice", "Tip kartice", "Stutus", "Osnovna/Dodatna", "Važi do"];
        zag.forEach(el=>{
            th = document.createElement("th");
            th.innerHTML=el;
            tr.appendChild(th);
        });
    }
    crtajKartice(korisnik)
    {
        var novihost = this.obrisiTabelu();
        this.crtajTabeluKartice(novihost);

        var telo = document.querySelector(".TabelaPodaci");
    
        if(this.nizRacuna === "")
        {
            this.nadjiKartice(korisnik);
        }
        else
        {
        fetch("https://localhost:5001/Kartica/VratiKartice/"+this.nizRacuna,
        {
            method:"GET"
        }).then( s=>
            {
                if(s.ok)
                {
                    s.json().then(data=>{
                        data.forEach(s=>{
                            let kartice = new Kartica(s.naziv_kartice, s.tip_kartice, s.status, s.osnovnaDodatna, s.vazenje);
                            kartice.crtaj(telo);
                        });
                    }) 
                }
                else
                {
                    alert("Greska");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu prikaza racuna.");
            });
        };
    }
    nadjiKartice(korisnik)
    {
        fetch("https://localhost:5001/Racun/VratiRacune/"+korisnik.id,
        {
            method:"GET"
        }).then( s=>
            {
                if(s.ok)
                {
                    s.json().then(data=>{
                        data.forEach(s=>{
                            const racun = new Racun(s.id,s.naziv, s.valuta, s.stanje, s.raspolozivo_Stanje); 
                            this.nizRacuna = this.nizRacuna.concat(racun.id, "a");
                        });
                    }) 
                }
                else
                {
                    alert("Greska");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu prikaza racuna.");
            });
            if(this.nizRacuna != "")
            {
               this.crtajKartice(korisnik);
            }
            else
            {
                alert("Korisnik ne sadrzi kartice");
                return;
            };
    }
    crtajTransakcija(host)
    {  
        var novihost = this.obrisiTabelu(); 
        let m = this.crtajRed(host);
        m.className="Logovanje";
        novihost.appendChild(m);

        let d = this.crtajRed(host);
        d.className="TextBox";
        let labela = document.createElement("label");
        labela.innerHTML = "Prenos sa:";
        d.appendChild(labela);
        let textboxSa = document.createElement("input");
        textboxSa.type = "text";
        d.appendChild(textboxSa);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        labela = document.createElement("label");
        labela.innerHTML = "Prenos na:";
        d.appendChild(labela);
        let textBoxNa = document.createElement("input");
        textBoxNa.type = "text";
        d.appendChild(textBoxNa);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        labela = document.createElement("label");
        labela.innerHTML = "Iznos:";
        d.appendChild(labela);
        let iznos = document.createElement("input");
        iznos.type = "number";
        d.appendChild(iznos);
        m.appendChild(d);

        d = this.crtajRed(host);
        d.className="TextBox";
        let dugme = document.createElement("button");
        dugme.innerHTML = "IZVRŠI";
        dugme.className = "Dugme";
        dugme.onclick=(ev)=>this.crtajPrikazTransakcije(textboxSa.value, textBoxNa.value, iznos.value);
        d.appendChild(dugme);
        m.appendChild(d);
    }
    crtajTabeluTransakcija(host)
    {
        var tabela = document.createElement("table");
        tabela.className="tabela";
        host.appendChild(tabela);

        var tabelahead= document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);  
        
        var tabelaBody = document.createElement("tbody");
        tabelaBody.className="TabelaPodaci";
        tabela.appendChild(tabelaBody); 
        
        let th;
        var zag=["Sa Računa", "Na Račun", "Iznos"];
        zag.forEach(el=>{
            th = document.createElement("th");
            th.innerHTML=el;
            tr.appendChild(th);
        }); 
    }
    crtajPrikazTransakcije(sa_racuna, na_racun, iznos)
    {
        
        if(sa_racuna === null || sa_racuna === undefined || sa_racuna === "")
        {
            alert("Unesite racun sa koga zelite da izvrsite transakciju");
            return;
        }
        if(na_racun === null || na_racun === undefined || na_racun === "" )
        {
            alert("Unesite na koji racun zelite da izvrsite transakciju");
            return;
        }
        if(sa_racuna == na_racun)
        {
            alert("Unesli ste iste racuna");
            return;
        }
        if(iznos === null || iznos === undefined || iznos === "")
        {
            alert("Niste uneli iznos");
            return;
        }

        fetch("https://localhost:5001/Transakcija/IzvrsiTransakciju/"+sa_racuna+"/"+na_racun+"/"+iznos,
        {
            method:"POST"
        }).then( s=>
            {
                if(s.ok)
                { 
                    alert("Uspesna transakacija");
                    var novihost = this.obrisiTabelu();
                    this.crtajTabeluTransakcija(novihost);
                    var telo = document.querySelector(".TabelaPodaci");
                    s.json().then(data=>{
                        console.log(data);
                        data.forEach(s=>{
                            const transakcija = new Transakcija(s.s_racun, s.n_racun, s.iznos);
                            transakcija.crtaj(telo);
                        });
                    });
                    
                }
                else
                {
                    alert("Greska");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška u pozivu izvrsenja transakcije.");
            }); 
   
    }
}
