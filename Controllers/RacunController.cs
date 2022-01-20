using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace MS_Banka.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RacunController : ControllerBase
    {
        public BankaContext Context { get; set; }
        public RacunController(BankaContext context)
        {
            Context = context;
        }
        
        [Route("VratiRacune/{idKorisnika}")]
        [HttpGet]
        public async Task<ActionResult> Racuni(int idKorisnika)
        { 
            if(idKorisnika == 0)
            {
                return BadRequest("Id korisnika nije dobar");
            }

            try
            {
                var korisnik = Context.Korisnici.Where(p =>p.ID == idKorisnika).FirstOrDefault();
                var racuni_po_korisniku = Context.Racuni
                .Where(p => p.Korisnik == korisnik);

                var racuni = await racuni_po_korisniku.ToListAsync(); 

                return Ok
                    (
                        racuni.Select(p =>
                        new
                        {
                            Id = p.ID,
                            Naziv = p.BrojRacuna,
                            Stanje = p.Stanje,
                            Raspolozivo_Stanje = p.RaspolozivoStanje,
                            Valuta = p.Valuta
                        }).ToList()
                    );
                    
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("DodajRacun/{idKorisnika}/{broj_racuna}/{stanje}/{raspolozivo}/{valuta}")]
        [HttpPost]
        public async Task<ActionResult> DodajRacun(int idKorisnika, Int64 broj_racuna, double stanje, double raspolozivo, string valuta) 
        { 
            if(idKorisnika <= 0)
            {
                return BadRequest("Id Korisnika nije dobar");
            }
            if (string.IsNullOrWhiteSpace(valuta) || valuta.Length > 3)
            {
                return BadRequest("Pogrešna valuta!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == idKorisnika).FirstOrDefaultAsync();

                Racun r = new Racun
                {
                    BrojRacuna = broj_racuna,
                    Stanje = stanje,
                    RaspolozivoStanje = raspolozivo,
                    Valuta = valuta,
                    Korisnik = korisnik
                };

                Context.Racuni.Add(r);
                await Context.SaveChangesAsync();
                return Ok(r.ID);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiRacun/{idKorisnika}/{broj_racuna}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int idKorisnika, Int64 broj_racuna) 
        { 
            if(idKorisnika <= 0)
            {
                return BadRequest("Pogresan id korisnika");
            }
            if(broj_racuna < 0)
            {
                return BadRequest("Pogresan broj racuna");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == idKorisnika).FirstOrDefaultAsync();
                var racun = await Context.Racuni.Where(p => p.Korisnik == korisnik && p.BrojRacuna == broj_racuna).FirstOrDefaultAsync();
                Context.Racuni.Remove(racun);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisan racun");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("UvecajStanje/{broj_racuna}/{iznos}")]
        [HttpPut]
        public async Task<ActionResult> Uvecaj(Int64 broj_racuna, double iznos) 
        { 
            if(broj_racuna < 0)
            {
                return BadRequest("Pogresan broj racuna");
            }
            try
            {
                var racun = await Context.Racuni.Where(p => p.BrojRacuna == broj_racuna).FirstOrDefaultAsync();
                racun.Stanje += iznos;
                Context.Racuni.Update(racun);
                await Context.SaveChangesAsync();
                return Ok("Uspesno uvecano stanje racuna");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("UmanjiStanje/{broj_racuna}/{iznos}")]
        [HttpPut]
        public async Task<ActionResult> Umanji(Int64 broj_racuna, double iznos) 
        { 
            if(broj_racuna < 0)
            {
                return BadRequest("Pogresan broj racuna");
            }
            try
            {
                var racun = await Context.Racuni.Where(p => p.BrojRacuna == broj_racuna).FirstOrDefaultAsync();
                racun.Stanje -= iznos;
                Context.Racuni.Update(racun);
                await Context.SaveChangesAsync();
                return Ok("Uspesno umanjeno stanje racuna");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
    
}