using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Transakcija")]
    
    public class Transakcija
    {
        [Key]
        public int ID { get; set; }

        public double Iznos { get; set; }
        public string Opis { get; set; }
        public DateTime Datum { get; set; }

        public Racun SaRacuna { get; set; }
        public Racun NaRacun { get; set; }
        
    }
}