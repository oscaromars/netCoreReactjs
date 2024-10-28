using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Formaapp.Models
{
    public class Detalle
    {
        public int Id { get; set; }

        [Required]
        public int CabeceraId { get; set; }

        [Required]
        public string? CampoDetalle { get; set; }

        [Required]
        public string? CampoValor { get; set; }

        public bool Estado { get; set; } = true; 

        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public DateTime FechaModificacion { get; set; } = DateTime.Now;

         [JsonIgnore]  
        public Cabecera? Cabecera { get; set; }
    }
}
