using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Formaapp.Models
{
    public class Cabecera
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string? NombreTabla { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public DateTime FechaModificacion { get; set; } = DateTime.Now;

        public bool Estado { get; set; } = true; 

        public ICollection<Detalle>? Detalles { get; set; } = new List<Detalle>();
    }
}
