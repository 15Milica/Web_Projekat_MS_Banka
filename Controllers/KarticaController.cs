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
    public class KarticaController : ControllerBase
    {
        public BankaContext Context { get; set; }
        public KarticaController(BankaContext context)
        {
            Context = context;
        }

        [Route("VratiKartice/{racuni}")]
        [HttpGet]
        public async Task<ActionResult> Kartice(string racuni)
        {  
             if (string.IsNullOrWhiteSpace(racuni))
            {
                return BadRequest("Nemamo racune");
            }

            try
            {
                var racuniID = racuni.Split('a')
                .Where(x=> int.TryParse(x, out _))
                .Select(int.Parse)
                .ToList();
                var kartice = Context.Kartice.Where(p => racuniID.Contains(p.Racun.ID));
                var k = await kartice.ToListAsync();

                return Ok( k.Select(p => 
                new 
                {
                    Naziv_kartice = p.BrojKartice,
                    Tip_kartice = p.Tip,
                    Status = p.Aktivna,
                    OsnovnaDodatna = p.OsnovnaDodatna,
                    Vazenje = p.DatumVazenja
                }).ToList());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}