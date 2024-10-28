using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Formaapp.Models; 
using Formaapp.Data;   

namespace Formaapp.Services 
{
    public class CabeceraService
    {
        private readonly MiDbContext _context;

        public CabeceraService(MiDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Cabecera> GetAll()
        {
            return _context.Cabeceras.ToList();
        }

        public Cabecera? GetById(int id) 
        {
            return _context.Cabeceras.Find(id);
        }

        public void Create(Cabecera cabecera)
        {
            _context.Cabeceras.Add(cabecera);
            _context.SaveChanges();
        }

        public void Update(Cabecera cabecera)
        {
            _context.Cabeceras.Update(cabecera);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var cabecera = _context.Cabeceras.Find(id);
            if (cabecera != null)
            {
                _context.Cabeceras.Remove(cabecera);
                _context.SaveChanges();
            }
        }
    }
}
