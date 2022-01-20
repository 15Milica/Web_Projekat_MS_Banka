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
    public class NalogController : ControllerBase
    {
        public BankaContext Context { get; set; }
        public NalogController(BankaContext context)
        {
            Context = context;
        }
        [EnableCors("CORS")]
        [Route("KreiranjeNologa/{korisnicko_ime}/{lozinka}/{JMBG_korisnika}")]
        [HttpPost]
        public async Task<ActionResult> KreirajNalog(string korisnicko_ime, string lozinka, int JMBG_korisnika)
        {  
            if (string.IsNullOrWhiteSpace(korisnicko_ime) || korisnicko_ime.Length > 10)
            {
                return BadRequest("Pogrešno korisnicko ime!");
            }

            if (string.IsNullOrWhiteSpace(lozinka) || lozinka.Length > 10)
            {
                return BadRequest("Pogrešna lozinka!");
            }
            try
            {
                var nalog = await Context.Nalozi.Where(p => p.KorisnickoIme == korisnicko_ime && p.Lozinka == lozinka && p.JMBG == JMBG_korisnika).FirstOrDefaultAsync();
                if(nalog == null)
                {
                     var korisnik = await Context.Korisnici.Where(p => p.JMBG == JMBG_korisnika).FirstOrDefaultAsync();

                  
                    if(korisnik != null)
                    {
                       
                        Nalog n = new Nalog
                        {
                            KorisnickoIme = korisnicko_ime,
                            Lozinka = lozinka,
                            JMBG = JMBG_korisnika,
                            Korisnik = korisnik
                        };
                        Context.Nalozi.Add(n);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno kreiran nalog");
                       
                    }
                    else
                    {
                        return StatusCode(202,"Korisnik ne postoji");
                    }
                }
                else
                {
                    return StatusCode(203,"Nalog sa datim korisničkim imenom ili lozinkom već postoji");
                }

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [EnableCors("CORS")]
        [Route("Prijava/{korisnicko_ime}/{lozinka}")]
        [HttpGet]
        public async Task<ActionResult> Prijava(string korisnicko_ime, string lozinka)
        {
            try
            {
                var nalog = await Context.Nalozi.Where(p => p.KorisnickoIme == korisnicko_ime && p.Lozinka == lozinka).FirstOrDefaultAsync();
                if(nalog != null)
                {
                    
                    var korisnik_po_nalogu = Context.Nalozi
                        .Where(p => p.KorisnickoIme == korisnicko_ime && p.Lozinka == lozinka)
                        .Include(p => p.Korisnik);

                    var korisnik = await korisnik_po_nalogu.ToListAsync(); 

                     return Ok
                        (
                            korisnik.Select(p =>
                            new
                            {
                                Ime = p.Korisnik.Ime,
                                Prezime = p.Korisnik.Prezime,
                                ID = p.Korisnik.ID

                            }).ToList()
                        );
                }
                else
                {
                    return BadRequest("Nalog ne postoji.Proverite korisničko ime ili lozinku!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
