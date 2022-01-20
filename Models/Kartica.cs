using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Kartica")]
    
    public class Kartica
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public Int64 BrojKartice { get; set; }

        [Required]
        [MaxLength(10)]
        public string Tip { get; set; }

        [Required]
        public bool Aktivna { get; set; }

        [Required]
        [MaxLength(10)]
        public string OsnovnaDodatna { get; set; }

        [Required]
        public DateTime DatumVazenja { get; set; } 

        public Racun Racun { get; set; }
        
    }
}