using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Nalog")]
    
    public class Nalog
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(10)]
        public string KorisnickoIme { get; set; }

        [Required]
        [MaxLength(10)]
        public string Lozinka { get; set; }

        [Required]
        public int JMBG { get; set; }
        
        public Korisnik Korisnik { get; set; }
    }
}