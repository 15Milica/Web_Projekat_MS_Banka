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
    public class KorisnikController : ControllerBase
    {
        public BankaContext Context { get; set; }
        public KorisnikController(BankaContext context)
        {
            Context = context;
        }
        [Route("VratiPodatke")]
        [HttpGet]
        public async Task<ActionResult> Podaci()
        { 
            try
            {
                return Ok(await Context.Korisnici.Select(p=>
                new
                {
                    Ime = p.Ime,
                    Prezime = p.Prezime
                }).ToListAsync());

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("DodajKorisnika")]
        [HttpPost]
        public async Task<ActionResult> Dodaj([FromBody] Korisnik korisnik) 
        { 
            try
            {
                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok("Korisnik je dodat");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}