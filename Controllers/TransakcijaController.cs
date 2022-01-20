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
    public class TransakcijaController : ControllerBase
    {
        public BankaContext Context { get; set; }
        public TransakcijaController(BankaContext context)
        {
            Context = context;
        }

        [Route("IzvrsiTransakciju/{sa_racun}/{na_racun}/{iznos}")]
        [HttpPost]
        public async Task<ActionResult> Transakcija(Int64 sa_racun, Int64 na_racun, double iznos)
        {  
            if (iznos < 0)
            {
                return BadRequest("Iznos nije dobar!");
            }
            try
            {
                var racun_sa = await Context.Racuni.Where(p => p.BrojRacuna == sa_racun).FirstOrDefaultAsync();
                var racun_na = await Context.Racuni.Where(p => p.BrojRacuna == na_racun).FirstOrDefaultAsync();
                if(racun_sa != null && racun_na != null)
                {
                    racun_sa.Stanje -= iznos;
                    Context.Racuni.Update(racun_sa);
                    await Context.SaveChangesAsync();

                    racun_na.Stanje += iznos;
                    Context.Racuni.Update(racun_na);
                    await Context.SaveChangesAsync();

                    Transakcija t = new Transakcija
                    {
                        Iznos = iznos,
                        SaRacuna = racun_sa,
                        NaRacun = racun_na,
                        Datum = DateTime.Now
                    };
                    Context.Transakcija.Add(t);
                    await Context.SaveChangesAsync();
                    var id = t.ID;
                    var podaci_o_transakciji = await Context.Transakcija
                    .Where(p => p.ID == id)
                    .Select(p => 
                    new 
                    {
                        s_racun = p.SaRacuna.BrojRacuna,
                        n_racun = p.NaRacun.BrojRacuna,
                        iznos = p.Iznos
                    }).ToListAsync();
                    return Ok(podaci_o_transakciji);
                }
                else
                {
                    return BadRequest("Nije dobar racun");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}