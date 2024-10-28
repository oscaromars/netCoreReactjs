namespace Formaapp.Controllers 
{
    using Microsoft.AspNetCore.Mvc;
    using Formaapp.Models; 
    using Formaapp.Services; 

    [ApiController]
    [Route("api/[controller]")]
    public class DetalleController : ControllerBase
    {
        private readonly DetalleService _detalleService;

        public DetalleController(DetalleService detalleService)
        {
            _detalleService = detalleService;
        }

        [HttpGet]
        public IActionResult GetDetalles()
        {
            var detalles = _detalleService.GetAll();
            return Ok(detalles);
        }

        [HttpGet("{id}")]
        public IActionResult GetDetalle(int id)
        {
            var detalle = _detalleService.GetById(id);
            if (detalle == null) return NotFound();
            return Ok(detalle);
        }

        [HttpPost]
        public IActionResult CreateDetalle([FromBody] Detalle detalle)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            _detalleService.Create(detalle);
            return CreatedAtAction(nameof(GetDetalle), new { id = detalle.Id }, detalle);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDetalle(int id, [FromBody] Detalle detalle)
        {
            if (id != detalle.Id) return BadRequest("ID del recurso no coincide con el ID del objeto.");

            try
            {
                _detalleService.Update(detalle);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDetalle(int id)
        {
            try
            {
                _detalleService.Delete(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}
