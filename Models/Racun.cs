using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Racun")]
    
    public class Racun
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public Int64 BrojRacuna { get; set; }

        public double Stanje { get; set; }
        public double RaspolozivoStanje { get; set; }

        [MaxLength(3)]
        public string Valuta { get; set; }

        [Required]
        public DateTime DatumOtvaranja { get; set; }

        public DateTime DatumZatvaranja { get; set; }

        public Korisnik Korisnik { get; set; }

        public List<Kartica> Kartice { get; set; }
        
    }
}