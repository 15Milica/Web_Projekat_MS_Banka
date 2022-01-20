using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Korisnik")]
    public class Korisnik
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int JMBG { get; set; }

        [Required]
        [MaxLength(20)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(20)]
        public string Prezime { get; set; }
        
        [Required]
        [MaxLength(20)]
        public string Adresa { get; set; }
        
        [Required]
        public DateTime DatumRodjenja { get; set; }

        public List<Racun> Racuni { get; set;}

    }
}