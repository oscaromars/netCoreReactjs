using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Formaapp.Models; 
using Formaapp.Data;   

namespace Formaapp.Services 
{
    public class DetalleService
    {
        private readonly MiDbContext _context;

        public DetalleService(MiDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Detalle> GetAll()
        {
            return _context.Detalles.Include(d => d.Cabecera).ToList();
        }

        public Detalle? GetByIdbase(int id) 
        {
            return _context.Detalles.Include(d => d.Cabecera).FirstOrDefault(d => d.Id == id);
        }

        public List<Detalle> GetById(int cabeceraId)
        {
    return _context.Detalles
        .Include(d => d.Cabecera) 
        .Where(d => d.CabeceraId == cabeceraId)
        .ToList();
        }


        public void Create(Detalle detalle)
        {
            _context.Detalles.Add(detalle);
            _context.SaveChanges();
        }

        public void Update(Detalle detalle)
        {
            _context.Detalles.Update(detalle);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var detalle = _context.Detalles.Find(id);
            if (detalle != null)
            {
                _context.Detalles.Remove(detalle);
                _context.SaveChanges();
            }
        }
    }
}
